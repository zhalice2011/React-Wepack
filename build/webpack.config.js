//配置webpack
const path = require('path') //使用相对路径 不要使用绝对路径
module.exports = {
    entry:{  
        app:path.join(__dirname,'../client/app') //表示app.js作为项目打包的入口 然后根据app.js里面的依赖关系 弄成关系树 变成一个js文件

    },
    output:{
        filename:'[name].[hash].js', //输出的文件名
        path:path.join(__dirname,'../dist'), //文件存放路径
        publicPath:'',//静态资源文件的引用路径  区分是静态资源还是api请求

    }
}