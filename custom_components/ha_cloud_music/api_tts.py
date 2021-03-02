import os, hashlib, asyncio, threading, time, aiohttp, json, urllib
from mutagen.mp3 import MP3
from homeassistant.helpers import template
from homeassistant.const import (STATE_IDLE, STATE_PAUSED, STATE_PLAYING, STATE_OFF, STATE_UNAVAILABLE)

from .api_const import ROOT_PATH
from .api_config import ApiConfig

# 百度TTS
IS_PY3 = True
from urllib.request import urlopen
from urllib.request import Request
from urllib.error import URLError
from urllib.parse import urlencode
from urllib.parse import quote_plus

API_KEY = '4E1BG9lTnlSeIf1NQFlrSq6h'
SECRET_KEY = '544ca4657ba8002e3dea3ac2f5fdd241'
# 发音人选择, 基础音库：0为度小美，1为度小宇，3为度逍遥，4为度丫丫，
# 精品音库：5为度小娇，103为度米朵，106为度博文，110为度小童，111为度小萌，默认为度小美 
PER = 4
# 语速，取值0-15，默认为5中语速
SPD = 5
# 音调，取值0-15，默认为5中语调
PIT = 5
# 音量，取值0-9，默认为5中音量
VOL = 5
# 下载的文件格式, 3：mp3(default) 4： pcm-16k 5： pcm-8k 6. wav
AUE = 3

FORMATS = {3: "mp3", 4: "pcm", 5: "pcm", 6: "wav"}
FORMAT = FORMATS[AUE]

CUID = "123456PYTHON"

TTS_URL = 'http://tsn.baidu.com/text2audio'
class DemoError(Exception):
    pass


"""  TOKEN start """

TOKEN_URL = 'http://openapi.baidu.com/oauth/2.0/token'
SCOPE = 'audio_tts_post'  # 有此scope表示有tts能力，没有请在网页里勾选


def fetch_token():
    print("fetch token begin")
    params = {'grant_type': 'client_credentials',
              'client_id': API_KEY,
              'client_secret': SECRET_KEY}
    post_data = urlencode(params)
    if (IS_PY3):
        post_data = post_data.encode('utf-8')
    req = Request(TOKEN_URL, post_data)
    try:
        f = urlopen(req, timeout=5)
        result_str = f.read()
    except URLError as err:
        print('token http response http code : ' + str(err.code))
        result_str = err.read()
    if (IS_PY3):
        result_str = result_str.decode()

    print(result_str)
    result = json.loads(result_str)
    print(result)
    if ('access_token' in result.keys() and 'scope' in result.keys()):
        if not SCOPE in result['scope'].split(' '):
            raise DemoError('scope is not correct')
        print('SUCCESS WITH TOKEN: %s ; EXPIRES IN SECONDS: %s' % (result['access_token'], result['expires_in']))
        return result['access_token']
    else:
        raise DemoError('MAYBE API_KEY or SECRET_KEY not correct: access_token or scope not found in token response')


"""  TOKEN end """



class ApiTTS():
    def __init__(self, media, cfg):
        self.hass = media._hass
        self.media = media
        self.media_position = None
        self.media_url = None
        self.thread = None        
        self.tts_before_message = cfg['tts_before_message']
        self.tts_after_message = cfg['tts_after_message']
        tts_mode = cfg['tts_mode']        
        if [1, 2, 3, 4].count(tts_mode) == 0:
            tts_mode = 4            
        self.tts_mode = tts_mode
        self.api_config = ApiConfig(os.path.join(os.path.dirname(__file__), 'dist/cache'))
    
    def log(self, name,value):
        self.media.api_media.log('【文本转语音】%s：%s',name,value)

    # 异步进行TTS逻辑
    def async_tts(self, text):
        # 如果当前正在播放，则暂停当前播放，保存当前播放进度
        if self.media._media != None and self.media._state == STATE_PLAYING:
           self.media.media_pause()
           self.media_position = self.media._media_position
           self.media_url = self.media._media_url        
        # 播放当前文字内容
        self.play_url(text)
        # 恢复当前播放到保存的进度
        if self.media_url != None:
            self.log('恢复当前播放URL', self.media_url)
            self.hass.services.call('media_player', 'play_media', {
                'entity_id': 'media_player.ha_cloud_music',
                'media_content_id': self.media_url,
                'media_content_type': 'music'
            })
            time.sleep(2)
            self.log('恢复当前进度', self.media_position)
            self.hass.services.call('media_player', 'media_seek', {
                'entity_id': 'media_player.ha_cloud_music',
                'seek_position': self.media_position
            })
            # 启用自动下一曲
            self.media._timer_enable = True
            self.media_url = None

    # 获取语音URL
    def play_url(self, text):
         # 生成文件名
        f_name = self.api_config.md5(text + str(self.tts_mode)) + ".mp3"
        # 创建目录名称
        _dir =  self.api_config.get_path('tts')
        self.api_config.mkdir(_dir)
        # 生成缓存文件名称
        ob_name = _dir + '/' + f_name
        self.log('本地文件路径', ob_name)
        # 文件不存在，则获取下载
        if os.path.isfile(ob_name) == False:
            token = fetch_token()
            tex = quote_plus(text)  # 此处TEXT需要两次urlencode
            print(tex)
            params = {'tok': token, 'tex': tex, 'per': self.tts_mode - 1, 'spd': SPD, 'pit': PIT, 'vol': VOL, 'aue': AUE, 'cuid': CUID,
                    'lan': 'zh', 'ctp': 1}  # lan ctp 固定参数

            data = urlencode(params)
            urllib.request.urlretrieve(TTS_URL + '?' + data, ob_name)
        else:
            # 如果没有下载，则延时1秒
            time.sleep(1)
        # 生成播放地址
        local_url = self.hass.config.api.deprecated_base_url + ROOT_PATH + '/cache/tts/' + f_name        
        self.log('本地URL', local_url)
        self.hass.services.call('media_player', 'play_media', {
            'entity_id': 'media_player.ha_cloud_music',
            'media_content_id': local_url,
            'media_content_type': 'music'
        })
        # 计算当前文件时长，设置超时播放时间
        audio = MP3(ob_name)
        self.log('音频时长', audio.info.length)
        time.sleep(audio.info.length + 4)

    async def speak(self, call):
        try:
            text = call.data['message']
            # 解析模板
            tpl = template.Template(text, self.hass)
            text = self.tts_before_message + tpl.async_render(None) + self.tts_after_message
            self.log('解析后的内容', text)
            if self.thread != None:
                self.thread.join()

            self.thread = threading.Thread(target=self.async_tts, args=(text,))
            self.thread.start()            
        except Exception as ex:
            self.log('出现异常', ex)

    # 清除缓存
    async def clear(self, call):
        try:
            _path = self.api_config.get_path('tts')
            self.api_config.delete(_path)  
        except Exception as ex:
            self.log('出现异常', ex)