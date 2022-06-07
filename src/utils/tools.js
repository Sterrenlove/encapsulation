
import request from '@/utils/request'
export function formatTime(curTime, type) {
  if (!curTime) {
    return ''
  }
  var nd = new Date(curTime)
  var y = nd.getFullYear()
  var mm = nd.getMonth() + 1
  var d = nd.getDate()
  var h = nd.getHours()
  var m = nd.getMinutes()
  var s = nd.getSeconds()
  if (mm < 10) {
    mm = '0' + mm
  }
  if (d < 10) {
    d = '0' + d
  }
  if (h < 10) {
    h = '0' + h
  }
  if (m < 10) {
    m = '0' + m
  }
  if (s < 10) {
    s = '0' + s
  }
  if (type == 'MM-DD') {
    return mm + '-' + d
  } else if (type == 'yyyy-MM-dd') {
    return y + '-' + mm + '-' + d
  } else if (type == 'week') {
    return y + '年' + mm + '月' + d + '日　' + weekDay[nd.getDay()]
  } else if (type == 'MM-DD&week') {
    return mm + '-' + d + '　' + weekDay[nd.getDay()]
  } else if (type == 'MM-DD&hh:mm') {
    return mm + '-' + d + ' ' + h + ':' + m
  } else if (type == '年月日') {
    return y + '年' + mm + '月' + d + '日　'
  } else if (type == 'yyyy-MM-dd&hh:mm') {
    return y + '-' + mm + '-' + d + ' ' + h + ':' + m
  }
  else if (type == 'yyyy-MM-dd&hh:mm:ss') {
    return y + '.' + mm + '.' + d + ' ' + h + ':' + m + ':' + s
  }
  return y + '-' + mm + '-' + d + ' ' + h + ':' + m
}
export function getTimestamp(date) {
  // date为需要转换的时间
  return (new Date(date)).valueOf()
}
// 获取当前屏幕高度
export function getClientHeight() {
  var clientHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
  } else {
    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
  }
  return clientHeight
}
// 下载
export function funDownload(url,method,param,filename) {
  // const downLoading = Loading.service({ text: "正在下载数据，请稍候", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)", })
  if(method == "get"){
    return request({
      url: url,
      params:param,
      method: method,
      responseType: 'blob'
    }).then(res => {
      // downLoading.close()
      // 创建隐藏的可下载链接
      let eleLink = document.createElement('a')
      eleLink.download = filename
      eleLink.style.display = 'none'
      // 字符内容转变成blob地址
      let blob = new Blob([res])
      eleLink.href = URL.createObjectURL(blob)
      // 触发点击
      document.body.appendChild(eleLink)
      eleLink.click()
      // 然后移除
      document.body.removeChild(eleLink)
    }) 
  }else{
    return request({
      url: url,
      data:param,
      method: method,
      responseType: 'blob'
    }).then(res => {
      // downLoading.close()
      // 创建隐藏的可下载链接
      let eleLink = document.createElement('a')
      eleLink.download = filename
      eleLink.style.display = 'none'
      // 字符内容转变成blob地址
      let blob = new Blob([res])
      eleLink.href = URL.createObjectURL(blob)
      // 触发点击
      document.body.appendChild(eleLink)
      eleLink.click()
      // 然后移除
      document.body.removeChild(eleLink)
    }) 
  }
}
// 获取当前时间
export function getTime() {
  let yy = new Date().getFullYear();
  let mm = new Date().getMonth() + 1;
  if (mm >= 1 && mm <= 9) {
    mm = '0' + mm;
  }
  let dd = new Date().getDate();
  if (dd >= 1 && dd <= 9) {
    dd = '0' + dd;
  }
  let hh = new Date().getHours();
  let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
  let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
  let gettime = `${yy}${mm}${dd}${hh}${mf}${ss}`
  return gettime
}