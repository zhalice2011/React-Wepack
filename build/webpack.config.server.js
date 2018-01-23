//配置webpack
const path = require('path') //使用相对路径 不要使用绝对路径
const webpackMerge = require('webpack-merge') //用来合并2个webapackconfig
const baseConfig =require('./webpack.base')



module.exports = webpackMerge(baseConfig,{
    target:'node', //使用在哪一个执行环境中
    entry:{
        app:path.join(__dirname,'../client/server-entry.js') //表示app.js作为项目打包的入口 然后根据app.js里面的依赖关系 弄成关系树 变成一个js文件

    },
    externals: Object.keys(require('../package').dependencies),//指定的这些包不打包到最终的js里面
    output:{
        filename:'server-entry.js', // 输出的文件名
        libraryTarget:'commonjs2' // 打包出来使用的模块的方案(cmd cmd commonjs)
    },
    plugins: [
      new webpack.DefinePlugin({ // 定义一些变量
        'process.env.API_BASE': '"http://127.0.0.1:3000"'
      })
    ]
})
