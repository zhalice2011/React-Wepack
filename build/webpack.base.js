const path = require('path') //使用相对路径 不要使用绝对路径
module.exports ={
  output: {
    path:path.join(__dirname,'../dist'), //文件存放路径
    publicPath:'/public/',//静态资源文件的引用路径  区分是静态资源还是api请求
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  module: {
    rules:[ //一个数组 数组里面可以配置很多的loader
        {
            enforce:'pre', //表示执行真正的代码编译之前 我们要做执行的下面的test
            test:/.(js|jsx)$/,
            loader: 'eslint-loader', //表示以js和jsx结尾的文件都要使用eslintloader检查
            exclude:[  //忽略掉下面的文件 不进行检测
                path.resolve(__dirname,'../node_modules')
            ]
        },
        {
            test: /\.jsx$/, //判断哪一种类型(以jsx结尾的)的文件,都使用下面的loader
            loader: 'babel-loader' //babel是一个可以编译最新的js语法的工具.编译成es5语法

        },
        {
            test: /\.js$/, //判断哪一种类型(以jsx结尾的)的文件,都使用下面的loader
            loader: 'babel-loader', //babel是一个可以编译最新的js语法的工具.编译成es5语法
            exclude:[
                path.join(__dirname,'../node_modules')
            ]
        }
    ]
  }
}
