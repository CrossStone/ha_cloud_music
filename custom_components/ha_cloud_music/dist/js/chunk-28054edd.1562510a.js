(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28054edd"],{"8e44":function(t,e,n){"use strict";var a=n("c3f1"),i=n.n(a);i.a},"9a33":function(t,e,n){"use strict";var a=n("2fd4"),i=n("69b3"),r=n("f63e"),c=n("e754"),s=n("eafa"),o=n("7108"),l=n("8714"),u=n("238a"),m=Math.min,d=[].push,h="split",f="length",p="lastIndex",v=4294967295,g=!u((function(){RegExp(v,"y")}));n("0aed")("split",2,(function(t,e,n,u){var b;return b="c"=="abbc"[h](/(b)*/)[1]||4!="test"[h](/(?:)/,-1)[f]||2!="ab"[h](/(?:ab)*/)[f]||4!="."[h](/(.?)(.?)/)[f]||"."[h](/()()/)[f]>1||""[h](/.?/)[f]?function(t,e){var i=String(this);if(void 0===t&&0===e)return[];if(!a(t))return n.call(i,t,e);var r,c,s,o=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),m=0,h=void 0===e?v:e>>>0,g=new RegExp(t.source,u+"g");while(r=l.call(g,i)){if(c=g[p],c>m&&(o.push(i.slice(m,r.index)),r[f]>1&&r.index<i[f]&&d.apply(o,r.slice(1)),s=r[0][f],m=c,o[f]>=h))break;g[p]===r.index&&g[p]++}return m===i[f]?!s&&g.test("")||o.push(""):o.push(i.slice(m)),o[f]>h?o.slice(0,h):o}:"0"[h](void 0,0)[f]?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,a){var i=t(this),r=void 0==n?void 0:n[e];return void 0!==r?r.call(n,i,a):b.call(String(i),n,a)},function(t,e){var a=u(b,t,this,e,b!==n);if(a.done)return a.value;var l=i(t),d=String(this),h=r(l,RegExp),f=l.unicode,p=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(g?"y":"g"),y=new h(g?l:"^(?:"+l.source+")",p),_=void 0===e?v:e>>>0;if(0===_)return[];if(0===d.length)return null===o(y,d)?[d]:[];var C=0,w=0,O=[];while(w<d.length){y.lastIndex=g?w:0;var k,j=o(y,g?d:d.slice(w));if(null===j||(k=m(s(y.lastIndex+(g?0:w)),d.length))===C)w=c(d,w,f);else{if(O.push(d.slice(C,w)),O.length===_)return O;for(var x=1;x<=j.length-1;x++)if(O.push(j[x]),O.length===_)return O;w=C=k}}return O.push(d.slice(C)),O}]}))},"9e76":function(t,e,n){"use strict";var a=n("69b3"),i=n("eafa"),r=n("e754"),c=n("7108");n("0aed")("match",1,(function(t,e,n,s){return[function(n){var a=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,a):new RegExp(n)[e](String(a))},function(t){var e=s(n,t,this);if(e.done)return e.value;var o=a(t),l=String(this);if(!o.global)return c(o,l);var u=o.unicode;o.lastIndex=0;var m,d=[],h=0;while(null!==(m=c(o,l))){var f=String(m[0]);d[h]=f,""===f&&(o.lastIndex=r(l,i(o.lastIndex),u)),h++}return 0===h?null:d}]}))},a3ad:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comment"},[n("mm-loading",{model:{value:t.mmLoadShow,callback:function(e){t.mmLoadShow=e},expression:"mmLoadShow"}}),t.hotComments.length>0?n("dl",{staticClass:"comment-list",on:{scroll:function(e){return t.listScroll(e)}}},[n("dt",{staticClass:"comment-title"},[t._v("精彩评论")]),t._l(t.hotComments,(function(e){return n("dd",{key:e.commentId,staticClass:"comment-item"},[n("a",{attrs:{target:"_blank",href:"https://music.163.com/#/user/home?id="+e.user.userId}},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.user.avatarUrl+"?param=50y50",expression:"`${item.user.avatarUrl}?param=50y50`"}],staticClass:"comment-item-pic"}),n("h2",{staticClass:"comment-item-title"},[t._v(t._s(e.user.nickname))])]),n("p",{staticClass:"comment-item-disc"},[t._v(t._s(e.content))]),n("div",{staticClass:"comment-item-opt"},[n("span",{staticClass:"comment-opt-date"},[t._v(t._s(t._f("format")(e.time)))]),n("span",{staticClass:"comment-opt-liked"},[n("mm-icon",{attrs:{type:"good"}}),t._v("\n          "+t._s(e.likedCount)+"\n        ")],1)])])})),n("dt",{staticClass:"comment-title"},[t._v("最新评论（"+t._s(t.total)+"）")]),t._l(t.commentList,(function(e){return n("dd",{key:e.commentId,staticClass:"comment-item"},[n("a",{staticClass:"comment-item-pic",attrs:{target:"_blank",href:"https://music.163.com/#/user/home?id="+e.user.userId}},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.user.avatarUrl+"?param=50y50",expression:"`${item.user.avatarUrl}?param=50y50`"}],staticClass:"cover-img"})]),n("h2",{staticClass:"comment-item-title"},[n("a",{attrs:{target:"_blank",href:"https://music.163.com/#/user/home?id="+e.user.userId}},[t._v(t._s(e.user.nickname))])]),n("p",{staticClass:"comment-item-disc"},[t._v(t._s(e.content))]),t._l(e.beReplied,(function(e){return n("div",{key:e.user.userId,staticClass:"comment-item-replied"},[n("a",{attrs:{target:"_blank",href:"https://music.163.com/#/user/home?id="+e.user.userId}},[t._v(t._s(e.user.nickname))]),t._v("\n        ："+t._s(e.content)+"\n      ")])})),n("div",{staticClass:"comment-item-opt"},[n("span",{staticClass:"comment-opt-date"},[t._v(t._s(t._f("format")(e.time)))]),e.likedCount>0?n("span",{staticClass:"comment-opt-liked"},[n("mm-icon",{attrs:{type:"good"}}),t._v("\n          "+t._s(e.likedCount)+"\n        ")],1):t._e()])],2)}))],2):t._e()],1)},i=[],r=n("fd4b"),c=n("365c"),s=n("ca00"),o=n("f904"),l=n("ac0d"),u={name:"Comment",components:{MmLoading:o["a"]},filters:{format:function(t){var e,n=new Date(t),a={year:n.getFullYear(),month:n.getMonth(),date:n.getDate(),hours:n.getHours(),minutes:n.getMinutes()},i=new Date,r=i.getTime()-t;return e=i.getDate()===a.date&&r<6e4?"刚刚":i.getDate()===a.date&&r>6e4&&r<36e5?"".concat(Math.floor(r/6e4),"分钟前"):i.getDate()===a.date&&r>36e5&&r<864e5?"".concat(Object(s["a"])(a.hours),":").concat(Object(s["a"])(a.minutes)):i.getDate()!==a.date&&r<864e5?"昨天".concat(Object(s["a"])(a.hours),":").concat(Object(s["a"])(a.minutes)):i.getFullYear()===a.year?"".concat(a.month+1,"月").concat(a.date,"日"):"".concat(a.year,"年").concat(a.month+1,"月").concat(a.date,"日"),e}},mixins:[l["a"]],data:function(){return{lockUp:!0,page:0,hotComments:[],commentList:[],total:null}},watch:{commentList:function(t,e){t.length!==e.length&&(this.lockUp=!1)}},created:function(){this.initData()},methods:{initData:function(){var t=this;Object(c["b"])(this.$route.params.id,this.page).then((function(e){200===e.data.code&&(t.hotComments=e.data.hotComments,t.commentList=e.data.comments,t.total=e.data.total,t.lockUp=!0,t._hideLoad())}))},listScroll:function(t){if(!this.lockUp){var e=t.target,n=e.scrollTop,a=e.scrollHeight,i=e.offsetHeight;n+i>=a-100&&(this.lockUp=!0,this.page+=1,this.pullUp())}},pullUp:function(){var t=this;Object(c["b"])(this.$route.params.id,this.page).then((function(e){200===e.data.code&&(t.commentList=[].concat(Object(r["a"])(t.commentList),Object(r["a"])(e.data.comments)))}))}}},m=u,d=(n("8e44"),n("5511")),h=Object(d["a"])(m,a,i,!1,null,"40b465fa",null);e["default"]=h.exports},ac0d:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));n("5ab2"),n("6d57"),n("e10e");var a=n("9d37"),i=n("08c1");function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){Object(a["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}c({},Object(i["c"])(["playing","currentMusic"])),c({selectItem:function(t,e){t.id===this.currentMusic.id&&this.playing?this.setPlaying(!1):this.selectPlay({list:this.list,index:e})}},Object(i["d"])({setPlaying:"SET_PLAYING"}),{},Object(i["b"])(["selectPlay"]));var s={data:function(){return{mmLoadShow:!0}},methods:{_hideLoad:function(){var t,e=this;clearTimeout(t),t=setTimeout((function(){e.mmLoadShow=!1}),200)}}}},c3f1:function(t,e,n){},ca00:function(t,e,n){"use strict";n.d(e,"d",(function(){return i})),n.d(e,"a",(function(){return r})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return s}));n("163d"),n("f548"),n("9e76"),n("9a33");function a(t,e){var n=-1,a=t.length;e||(e=new Array(a));while(++n<a)e[n]=t[n];return e}var i=function(t){var e=null==t?0:t.length;if(!e)return[];var n=-1,i=e-1,r=a(t);while(++n<e){var c=n+Math.floor(Math.random()*(i-n+1)),s=r[c];r[c]=r[n],r[n]=s}return t};function r(t){return t<10?"0"+t:t}function c(t){for(var e=t.split("\n"),n=[],a=0;a<e.length;a++){var i=decodeURIComponent(e[a]),r=/\[\d*:\d*((\.|:)\d*)*\]/g,c=i.match(r);if(c)for(var s=i.replace(r,""),o=0,l=c.length;o<l;o++){var u=c[o],m=Number(String(u.match(/\[\d*/i)).slice(1)),d=Number(String(u.match(/:\d*/i)).slice(1)),h=60*m+d;""!==s&&n.push({time:h,text:s})}}return n}function s(t){var e=Math.floor(t/60),n=Math.floor(t%60);return"".concat(r(e),":").concat(r(n))}}}]);
//# sourceMappingURL=chunk-28054edd.1562510a.js.map