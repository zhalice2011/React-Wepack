// 把整个服务端渲染的逻辑放在这个文件
const ejs = require('ejs')
const asyncBootstrap = require('react-async-bootstrapper').default  //因为这个包是使用export和import的模式去开发的 所以node中require引用需要加上default才能引入真正的内容
const serialize = require('serialize-javascript')
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

//新建一个得到store的函数  
const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

const serverRender = (bundle, template, req, res) => {
  console.log("serverRender中的 bundle",bundle)
  console.log("serverRender中的 bundle.default=creatApp",bundle.default)
  console.log("serverRender中的 bundle.createStoreMap=createStoreMap",bundle.default)
  return new Promise((resolve,reject) => {
    const createStoreMap = bundle.createStoreMap
    const creatApp = bundle.default
    const routerContext= {}
    const stores = createStoreMap()
    
    const app = creatApp(stores, routerContext, req.url)
    
    asyncBootstrap(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return false  // 不继续执行下面的代码了
      }
      const helmet = Helmet.rewind()
      const state = getStoreState(stores)
      console.log("服务端的store",state)
      
      const content = ReactDomServer.renderToString(app)
      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),  //通过这个插件把state转化成字符串 同步我们的strore
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
      })
      res.send(html)
      //渲染成功之后就resolve
      resolve()
    }).catch(reject)
  })
}



module.exports = serverRender
