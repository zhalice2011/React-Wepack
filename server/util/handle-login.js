// 登录
const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

// 登录接口
router.post('/login',function(req,res,next){
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken
  })
    .then(resp => {
      if(resp.status === 200 && resp.data.success){  // 请求成功
        // 在req.session上面存放数据
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.data.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url,
        }
        // 给浏览器端口发送数据
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) { // 有返回但是报错了
        res.json({
          success: false,
          data: err.response
        })
      } else {
        next(err)  // 把错误抛给全局的错误处理器来处理
      }
    })
})

module.exports = router
