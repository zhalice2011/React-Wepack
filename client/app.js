
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom' // 用来包裹路由的
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { Provider } from 'mobx-react'
import App from './views/App'

import AppStateClass from './store/app-state' // 引入store
// 获取服务端初始的store中的state
const initialState = window.__INITIAL_STATE__ || { } // eslint-disable-line
console.log('周达理', JSON.stringify(initialState)) // initialState.appState

const root = document.getElementById('root') // 缓存变量 减少损耗
// AppContainer 是热更新模块一定要放在最外面
const render = (Component) => { // 定义一个渲染的函数 传入一个Component
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppStateClass(initialState)}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
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
