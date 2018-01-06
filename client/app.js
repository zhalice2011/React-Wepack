
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom' // 用来包裹路由的
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from './views/App'

const root = document.getElementById('root') // 缓存变量 减少损耗
const render = (Component) => { // 定义一个渲染的函数 传入一个Component
  ReactDOM.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    root,
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default // eslint-disable-line
    render(NextApp)
  })
}
