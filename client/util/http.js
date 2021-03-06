// 用来发送axios请求的
import axios from 'axios'
// import queryString from 'query-string'

// 拿到webpack里面定义的API_BASE
// const baseUrl = process.env.API_BASE || ''
const baseUrl = 'https://cnodejs.org/api/v1'
console.log('baseUrl=>', baseUrl)
// const parseUrl = (url, params) => {
//   const str = Object.keys(params).reduce((result, key) => {
//     result += `${key}=${params[key]}&` // 形成一个?后面的字符串
//     return result
//   }, '')
//   // 输出一个字符串模板
//   return `${baseUrl}/api/${url}?#${str.substr(0, str.len - 1)}`
// }
const queryString = (url, json) => {
  json = json || {}
  const str = Object.keys(json).reduce((result, key) => {
    result += `${key}=${json[key]}&`
    return result
  }, '')
  return `${url}?${str.substr(0, str.length - 1)}`
}

// 获取topic数据的方法
export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    // console.log('get方法传入的 url', url)
    // console.log('get方法传入的 params', params)
    // const newurl = parseUrl(url, params)
    // console.log('获取topic数据的方法 newurl1=>', newurl)
    const newurl2 = queryString(`${baseUrl}/${url}`, params)
    console.log('获取topic数据的方法 newurl2=>', newurl2)
    axios.get(newurl2)
      .then((resp) => {
        console.log('获取到的用户信息', resp)
        const { data } = resp
        if (data && data.success === true) {
          resolve(data)
        } else {
          reject(data)
        }
      })
      .catch((err) => {
        if (err.response) {
          reject(err.response.data)
        } else {
          // reject({
          //   success: false,
          //   err_msg: err.message,
          // })
        }
      })
  })
}


export const post = (url, params, data) => {
  console.log('url, params, data', url, params, data)
  return new Promise((resolve, reject) => {
    let newurl = '';
    if (params === {}) {
      newurl = queryString(`${baseUrl}/${url}`, params)
    } else {
      newurl = `${baseUrl}/${url}`
    }
    console.log('newurl', newurl)
    axios.post(newurl, data)
      .then(resp => {
        console.log('请求肥来的数据', resp)
        const data2 = resp.data
        if (data2 && data2.success === true) {
          console.log('请求肥来的数据reslove')
          resolve(data2)
        } else {
          reject(data2)
        }
      })
      .catch((err) => {
        if (err.response) {
          reject(err.response.data)
        } else {
          // reject({
          //   success: false,
          //   err_msg: err.message,
          // })
        }
      })
  })
}
