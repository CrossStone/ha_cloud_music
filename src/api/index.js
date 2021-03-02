import axios from 'axios'
import qs from 'qs'
import { URL, defaultLimit } from '@/config'

let isDebug = true
let hass = null
try {
  hass = top.document.querySelector('home-assistant').hass
  isDebug = false
} catch {

}
axios.defaults.baseURL = isDebug ? URL : '/ha_cloud_music-api'
async function ha_http(params) {
  let auth = hass.auth
  let authorization = ''
  if (auth._saveTokens) {
    // 过期
    if (auth.expired) {
      await auth.refreshAccessToken()
    }
    authorization = `${auth.data.token_type} ${auth.accessToken}`
  } else {
    authorization = `Bearer ${auth.data.access_token}`
  }

  return new Promise((resolve, reject) => {
    axios.post('', params, {
      headers: {
        authorization
      }
    }).then(res => {
      resolve(res)
    }).catch(ex => {
      reject(ex)
    })
  })
}

async function handlerGet(url, data) {
  if (isDebug) {
    return axios.get(url, data)
  }
  if (data && 'params' in data && data['params']) {
    url = url + '?' + qs.stringify(data['params'])
  }

  return ha_http({
    type: 'web',
    url
  })
}

// 排行榜列表
export function getToplistDetail() {
  return handlerGet('/toplist/detail')
}

// 排行榜详情
export function topList(idx) {
  return handlerGet('/top/list', {
    params: {
      idx
    }
  })
}

// 推荐歌单
export function getPersonalized() {
  return handlerGet('/personalized')
}

// 歌单详情
export async function getPlaylistDetail(id) {

  let res = await handlerGet('/playlist/detail', {
    params: {
      id
    }
  })

  let ids = res.data.playlist.trackIds.map(ele => ele.id)
  // console.log(ids)
  let res2 = await handlerGet('/song/detail', {
    params: {
      ids: ids.join(',')
    }
  })
  // console.log(res2.data)
  res.data.playlist.tracks = res2.data.songs
  return res
}

// 电台 - 节目
export function getDjProgram(rid, offset, limit = 30) {
  return handlerGet('/dj/program', {
    params: {
      rid,
      offset,
      limit
    }
  })
}

// 搜索
export function search(keywords, page = 0, limit = defaultLimit) {
  return handlerGet('/search', {
    params: {
      offset: page * limit,
      limit: limit,
      keywords
    }
  })
}

// 热搜
export function searchHot() {
  return handlerGet('/search/hot')
}

// 获取用户歌单详情
export function getUserPlaylist(uid) {
  return handlerGet('/user/playlist', {
    params: {
      uid
    }
  })
}

// 获取用户云盘数据
export function getUserCloudList(uid) {
  return handlerGet('/user/cloud', {
    params: {}
  })
}

// 获取歌曲详情
export function getMusicDetail(ids) {
  return handlerGet('/song/detail', {
    params: {
      ids
    }
  })
}

// 获取音乐是否可以用
export function getCheckMusic(id) {
  return handlerGet('/check/music', {
    params: {
      id
    }
  })
}

// 获取音乐地址
export function getMusicUrl(id) {
  return handlerGet('/song/url', {
    params: {
      id
    }
  })
}

// 获取歌词
export function getLyric(id) {
  const url = '/lyric'
  return handlerGet(url, {
    params: {
      id
    }
  })
}

// 获取音乐评论
export function getComment(id, page, limit = defaultLimit) {
  return handlerGet('/comment/music', {
    params: {
      offset: page * limit,
      limit: limit,
      id
    }
  })
}

/* -----------------------------蜻蜓FM------------------------------- */
// 获取分类
export function getCategories() {
  return new Promise((resolve, reject) => {
    let arr = []
    axios.get('https://rapi.qingting.fm/categories?type=channel').then(({ data }) => {
      if (data.Success === 'ok') {
        data.Data.forEach(ele => {
          arr.push({
            id: ele.id,
            name: ele.title,
            updateFrequency: '',
            picUrl: 'https://p2.music.126.net/WEIm9ckMQ9AmN7kKDn30VQ==/109951163686912767.jpg'
          })
        })
        resolve(arr)
      }
    })
  })
}

// 获取电台列表
export function getFmList({ id, page, size }) {
  return new Promise((resolve, reject) => {
    if (!page) page = 1
    if (!size) size = 12
    axios.get(`https://rapi.qingting.fm/categories/${id}/channels?with_total=true&page=${page}&pagesize=${size}`).then(({ data }) => {
      if (data.Success === 'ok') {
        let res = data.Data

        let arr = []
        res.items.forEach(ele => {
          arr.push({
            album: ele.categories[0].title,
            duration: ele.audience_count,
            id: ele.content_id,
            image: ele.cover,
            name: (ele.nowplaying && ele.nowplaying.title) || ele.title,
            singer: ele.title,
            type: 'url',
            url: `http://lhttp.qingting.fm/live/${ele.content_id}/64k.mp3`
          })
        })

        resolve({
          list: arr,
          total: res.total
        })
      }
    })
  })
}

/* -----------------------------喜马拉雅------------------------------- */
export function getXMLY() {
  return new Promise((resolve, reject) => {
    let arr = [
      // 情感
      {
        id: 258244,
        name: '默默道来',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group5/M00/29/C3/wKgDtlOJtkzivkzmAADGuNXUrNM293.jpg!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      },
      {
        id: 294567,
        name: '心有千千结',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group5/M06/64/A9/wKgDtlRXPuySHY8qAAFRlUZP_DQ151.jpg!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      },
      {
        id: 11037095,
        name: '晚上十点',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group34/M08/C2/4D/wKgJYFnfFk-gmVIOAAB48t9YaOY252.jpg!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      },
      {
        id: 11848122,
        name: '壹心理',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group61/M05/81/53/wKgMcF0KB6zA4hY9AAKWHls19a8292.jpg!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      },
      // 新闻
      {
        id: 12580785,
        name: '鲜快报',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group33/M02/85/08/wKgJTFpcaUCS86jcAADx8I4Z1Fs369.jpg!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      },
      {
        id: 9444470,
        name: '36氪·商业情报局',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group48/M01/05/A5/wKgKlVtNg9OSD_d-AAN2EEUNIeE007.jpg!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      },
      {
        id: 4519297,
        name: '新闻早餐',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group18/M01/19/DE/wKgJKleDXj2QJYOuAAFbNixU8BI237.png!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      },
      // 娱乐
      {
        id: 203355,
        name: '段子来了',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group5/M03/A6/D8/wKgDtlR1MD_T1DQHAANqZDyk48s720.jpg!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      },
      {
        id: 3493173,
        name: '糗事播报',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group31/M0A/25/96/wKgJX1pdzZzjnr3NAAFNJ3rTL_0833.jpg!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      },
      // 历史
      {
        id: 8291530,
        name: '大锤说史',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group28/M05/62/A0/wKgJSFkn-2TDJDTmAAPtFtS38Pk707.jpg!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      },
      {
        id: 3144025,
        name: '大力史',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group60/M08/30/7A/wKgLb1zH9TXj1zs7AADWaZ7G48A852.jpg!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      },
      {
        id: 29529692,
        name: '短篇灵异故事',
        updateFrequency: '',
        picUrl: 'https://imagev2.xmcdn.com/group68/M06/27/B6/wKgMeF2pz_6yqZuHAABefvU6Zas974.jpg!strip=1&quality=7&magick=jpg&op_type=5&upload_type=album&name=mobile_large&device_type=ios'
      }
    ]
    resolve(arr)
  })
}

export function getXMLYlist({ id, page, size }) {
  return new Promise((resolve, reject) => {
    if (!page) page = 1
    if (!size) size = 50

    // axios.post('https://api.jiluxinqing.com/api/service/proxy', {
    //   method: 'GET',
    //   url: `https://mobile.ximalaya.com/mobile/v1/album/track?albumId=${id}&device=android&isAsc=true&pageId=${page}&pageSize=${size}&statEvent=pageview%2Falbum%40203355&statModule=%E6%9C%80%E5%A4%9A%E6%94%B6%E8%97%8F%E6%A6%9C&statPage=ranklist%40%E6%9C%80%E5%A4%9A%E6%94%B6%E8%97%8F%E6%A6%9C&statPosition=8`
    // })

    ha_http({
      type: 'proxy',
      url: `https://mobile.ximalaya.com/mobile/v1/album/track?albumId=${id}&device=android&isAsc=true&pageId=${page}&pageSize=${size}&statEvent=pageview%2Falbum%40203355&statModule=%E6%9C%80%E5%A4%9A%E6%94%B6%E8%97%8F%E6%A6%9C&statPage=ranklist%40%E6%9C%80%E5%A4%9A%E6%94%B6%E8%97%8F%E6%A6%9C&statPosition=8`
    }).then(({ data }) => {
      if (data.ret === 0) {
        let res = data.data
        let list = res.list

        let arr = []
        list.forEach(ele => {
          arr.push({
            album: '喜马拉雅',
            duration: ele.duration,
            id: ele.trackId,
            image: ele.coverLarge,
            name: ele.title,
            singer: ele.nickname,
            type: 'url',
            url: ele.playUrl64
          })
        })

        resolve({
          list: arr,
          total: res.totalCount
        })
      }
    })
  })
}

/* -----------------------------网易电台------------------------------- */
// 获取电台
export function getFM163() {
  return new Promise((resolve, reject) => {
    let arr = [
      {
        id: 1008,
        name: '网易轻松一刻',
        updateFrequency: '',
        picUrl: 'https://p2.music.126.net/WpJ-eHT47MDiOaq27EUTzQ==/109951163959542449.jpg'
      },
      {
        id: 332398053,
        name: '报刊选读',
        updateFrequency: '',
        picUrl: 'https://p2.music.126.net/LGdz3aHX0v6ODAYroiYH6A==/3299634397415569.jpg'
      },
      {
        id: 331464058,
        name: '睡不着电台',
        updateFrequency: '',
        picUrl: 'https://p1.music.126.net/Hmikf7lu9uc6YwhseOIL2A==/109951163304402567.jpg'
      },
      {
        id: 350159057,
        name: '新华社夜读',
        updateFrequency: '',
        picUrl: 'http://p2.music.126.net/jEV4SxchW0YlgiD8DcMsVw==/18958878997991998.jpg'
      },
      {
        id: 339906053,
        name: '小北电台',
        updateFrequency: '',
        picUrl: 'https://p1.music.126.net/Jbno74p63uXXIgtafwMZcw==/109951163620386920.jpg'
      },
      {
        id: 526835598,
        name: '解忧大白',
        updateFrequency: '',
        picUrl: 'http://p2.music.126.net/CqY_3i2xrLJxcY1knWJ-ZQ==/109951164134175221.jpg'
      },
      {
        id: 349437249,
        name: '夜听',
        updateFrequency: '',
        picUrl: 'https://p2.music.126.net/x6lw6XTZhViVL5I4j_zj7A==/18568552371730335.jpg'
      },
      {
        id: 316038,
        name: '好姑娘对你说晚安',
        updateFrequency: '',
        picUrl: 'https://p2.music.126.net/MbnVK0CEGZNw4CBVW0P-fw==/6668538023616484.jpg'
      },
      {
        id: 332327052,
        name: '向北',
        updateFrequency: '',
        picUrl: 'https://p2.music.126.net/aAmcvKKcOHVQmoCqlT3E9g==/1412872444869584.jpg'
      }
    ]
    resolve(arr)
  })
}

/* -----------------------------小爬虫------------------------------- */
export function getXPC() {
  return new Promise((resolve, reject) => {
    let arr = [
      {
        id: './data/ljsw.json',
        name: '罗辑思维',
        picUrl: 'https://piccdn.igetget.com/img/201807/19/201807191556587359037523.jpg'
      }
    ]
    resolve(arr)
  })
}

export function getXpcList(url) {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => res.json()).then(res => {
      resolve(res)
    })
  })
}
