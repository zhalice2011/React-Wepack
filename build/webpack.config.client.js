//配置webpack
const path = require('path') //使用相对路径 不要使用绝对路径
const webpack = require('webpack')
const webpackMerge = require('webpack-merge') //用来合并2个webapackconfig
const baseConfig =require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//判断是不是开发的环境
const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig,{
    entry:{
        app:path.join(__dirname,'../client/app.js') //表示app.js作为项目打包的入口 然后根据app.js里面的依赖关系 弄成关系树 变成一个js文件

    },
    output:{
        filename:'[name].[hash].js', //输出的文件名
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'../client/temlate.html')
        })
    ]
})

//localhost:8888/filename才能访问到所有文件
if (isDev){ //如果是开发环境 我们就给config加上一下配置
    config.entry = {
        app:[
            'react-hot-loader/patch',
            path.join(__dirname,'../client/app.js')
        ]
    }
    config.devServer = {
        host : '0.0.0.0', //所有的都能访问 ip或者localhost
        port: '8888',
        contentBase:path.join(__dirname,'../dist'),
        hot:true,  //启动Hot module replacement
        overlay:{
            errors:true //在编译的时候出现任何错误 就在网页显示黑色背景 和错误信息
        },
        publicPath:'/public',  //访问所有静态路径都加上/public
        historyApiFallback:{
            index:'/public/index.html'  //所有404的请求都返回这个指定index.html
        }
   }
   config.plugins.push(new webpack.HotModuleReplacementPlugin() )
}
module.exports = config
