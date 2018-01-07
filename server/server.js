
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const ReactSSR = require('react-dom/server')
const fs = require('fs')  //读取文件的模块
const path = require('path')

//判断是否是开发环境
const isDev = process.env.NODE_ENV === 'development'

const app = express()
app.use(bodyParser.json())  //post请求 都转化成req.body 这样后面写代码的时候只要从req.body里面取数据就行了呢
app.use(bodyParser.urlencoded({ extended: false })) // 对应表单请求的类型 from-data

app.use(session({
  maxAge: 10 * 60 * 1000,  // 60分钟
  name: 'tid',  //session放在浏览器端口的cookieid
  resave: false, //每次请求是否重新生成cookieid
  saveUninitialized: false,
  secret: 'mtmweixin'  //用这个字符串加密我们的cookie
}))

app.use(favicon(path.join(__dirname,'../favicon.ico')))

// 先处理api
app.use('/api/user', require('./util/handle-login'))  //登录
app.use('/api', require('./util/proxy')) 



if(!isDev){ //不是开发环境
    app.use('/public',express.static(path.join(__dirname,'../dist')))  //设置静态文件的目录  表示前端请求只要是/public开头的我们都返回这个 /dist静态文件目录
    const serverEntry = require('../dist/server-entry').default

    const template = fs.readFileSync(path.join(__dirname,"../dist/index.html"),"utf-8")//同步读取这个文件  注意这里如果不指定'utf8'就会出现读取到的数据是一个Buffer
    app.get('*',function(req,res){  //*表示接受所有的内容不管是什么都进行下面的操作
        const appString = ReactSSR.renderToString(serverEntry)
        template.replace('<!-- app -->',appString)  //将<app></app>替换成appString
        res.send(template)
    })
}else{//是开发环境 dev
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen(3000,function(){
    console.log('server is listening 3000 port')
})
