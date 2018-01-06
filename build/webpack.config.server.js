//配置webpack
const path = require('path') //使用相对路径 不要使用绝对路径
const webpackMerge = require('webpack-merge') //用来合并2个webapackconfig
const baseConfig =require('./webpack.base')

module.exports = webpackMerge(baseConfig,{
    target:'node', //使用在哪一个执行环境中
    entry:{
        app:path.join(__dirname,'../client/server-entry.js') //表示app.js作为项目打包的入口 然后根据app.js里面的依赖关系 弄成关系树 变成一个js文件

    },
    output:{
        filename:'server-entry.js', //输出的文件名
        libraryTarget:'commonjs2' //打包出来使用的模块的方案(cmd cmd commonjs)
    },
    // modle:{
    //     rules:[ //一个数组 数组里面可以配置很多的loader
    //         {
    //             test: /\.jsx$/, //判断哪一种类型(以jsx结尾的)的文件,都使用下面的loader
    //             loader: 'babel-loader' //babel是一个可以编译最新的js语法的工具.编译成es5语法

    //         },
    //         {
    //             test: /\.js$/, //判断哪一种类型(以jsx结尾的)的文件,都使用下面的loader
    //             loader: 'babel-loader', //babel是一个可以编译最新的js语法的工具.编译成es5语法
    //             exclude:[
    //                 path.join(__dirname,'../node_modules')
    //             ]
    //         }
    //     ]
    // }
})
