
const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')  //读取文件的模块
const path = require('path')
const serverEntry = require('../dist/server-entry').default
const app = express()

const template = fs.readFileSync(path.join(__dirname,"../dist/index.html"),"utf8")//同步读取这个文件  注意这里如果不指定'utf8'就会出现读取到的数据是一个Buffer

app.use('/public',express.static(path.join(__dirname,'../dist')))  //设置静态文件的目录  表示前端请求只要是/public开头的我们都返回这个 /dist静态文件目录

app.get('*',function(req,res){  //*表示接受所有的内容不管是什么都进行下面的操作
    const appString = ReactSSR.renderToString(serverEntry)
    template.replace('<!-- app -->',appString)  //将<app></app>替换成appString
    res.send(template)
})

app.listen(3000,function(){
    console.log('server is listening 3000 port')
})