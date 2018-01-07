// 把所有请求cnode的接口都代理出去
const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = function(req,res,next) {
  console.log("/api")
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken
  //判断用户是否需要accesstoken
  if (needAccessToken && user.accessToken) { //表示没有登录
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query)
  if (query.needAccessToken) delete query.needAccessToken  // 删除这个对象的needAccessToken属性
  //如果用户已经登录  发送请求cndodeqpi
  console.log("req.method",req.method)
  console.log("${baseUrl}${path}", `${baseUrl}${path}`)
  console.log("query", query)
  console.log("/api  如果用户已经登录  发送请求cndodeqpi")
  axios(`${baseUrl}${path}`,{
    method: req.method,
    params: query,
    data: Object.assign({}, req.body, {
      accesstoken: user.accessToken
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencode' //请求头  使用formdata的方式
    }
  }).then(resp => {
    console.log("请求会来的东西",resp)
    if(resp.status === 2000){
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
      
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知的错误'
      })      
    }
  })
}
