
const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server-render')

const getTemplate = () => {  //通过这个方法实时拿到最新的Template文件
    return new Promise((resolve,reject)=>{
      axios.get('http://localhost:8888/public/server.ejs')
          .then(res => {
              resolve(res.data)
          })
          .catch((error) => {
              reject(error)
              console.error(error);
          })
    })
}

const NativeModule = require('module')  //此处的module是对应下面的 module.exports
const vm = require('vm')
const getMoudleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle) // 原生的方法 就是将bundle包装一下加上了 引用的js
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true,
  })
  const result = script.runInThisContext()   // 指定执行环境  表示就使用现在的执行环境
  result.call(m.exports, m.exports, require, m)
  return m
}

const mfs = new MemoryFs()  //创建一个内存
//
const serverCompiler = webpack(serverConfig) //有了webpack 和webpack的配置  我们就可以启动一个compiler
serverCompiler.outputFileSystem = mfs //配置写入内存
let serverBundle //注册一个变量
//webpack里面的监听事件  文件变化
serverCompiler.watch({},(err,status)=>{  //status是webpack打包的过程中输出的一些信息
    if (err) throw err
    status = status.toJson()
    status.errors.forEach(err=>console.log(err))  //打印错误信息
    status.warnings.forEach(warn=>console.log(warn(warn))) //打印警告信息
    //获取bundle的路径  其实就是config里面配置的
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath,'utf-8') //读出来的文件是一个string

    const m = getMoudleFromString(bundle, 'server-entry.js')
    console.log("m.exports.default",m.exports.default)
    serverBundle = m.exports   //由于是使用的require
})


module.exports = function(app){
    // 通过代理的方法 把静态文件全部代理到我们的webpackdevserver启动的服务上
    app.use('/public',proxy({
        target:'http://localhost:8888'
    }))

    app.get('*',function(req, res, next){
        // 判断serverBundle是否存在
        if (!serverBundle) {
          return res.send('waiting for compilem, refresh later')  //等他执行完成才能进行返回
        }
        // 1.获取template
        getTemplate().then(template => {
          console.log("serverBundle",serverBundle)
          console.log("template",template)
          //setTimeout(function(){
            return serverRender(serverBundle, template, req, res)
          //},1000)
        }).catch(next)
    })
}


