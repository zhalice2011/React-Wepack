
const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')

const ReactDomServer = require('react-dom/server')

const proxy = require('http-proxy-middleware')
const serverConfig = require('../../build/webpack.config.server')


const getTemplate = () => {  //通过这个方法实时拿到最新的Template文件
    return new Promise((resolve,reject)=>{
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data)
            })
            //.catch(reject)
            .catch((error) => {
                reject(error)
                console.error(error);
            })
    })
}

const Module = module.constructor  //此处的module是对应下面的 module.exports

const mfs = new MemoryFs()  //创建一个内存
//
const serverCompiler = webpack(serverConfig) //有了webpack 和webpack的配置  我们就可以启动一个compiler
serverCompiler.outputFileSystem = mfs //配置写入内存
let serverBundle, createStoreMap //注册一个变量
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

    const m = new Module()
    m._compile(bundle,'server-entry.js')  //将上面的string编译成nodejs可以使用的module
    serverBundle = m.exports.default   //由于是使用的require
    createStoreMap = m.exports.createStoreMap 

})

module.exports = function(app){
    //通过代理的方法 把静态文件全部代理到我们的webpackdevserver启动的服务上
    app.use('/public',proxy({
        target:'http://localhost:8888'
    }))

    app.get('*',function(req,res){
        //1.获取template
        getTemplate().then(template=>{
          const routerContext= {}
          const app = serverBundle(createStoreMap(), routerContext, req.url)
          
          const content = ReactDomServer.renderToString(app)
          res.send(template.replace('<!-- app -->',content))  //替换
        })
    })
}
