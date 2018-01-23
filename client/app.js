
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom' // 用来包裹路由的
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { Provider } from 'mobx-react'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles' // 引入主题
import { lightBlue, pink } from 'material-ui/colors' // 颜色选择

import App from './views/App'
import { AppState, TopicStore } from './store/store' // 引入store

const theme = createMuiTheme({ // 创建material的主题
  palette: {
    primary: lightBlue,
    accent: pink,
    type: 'light',
  },
})

// 获取服务端初始的store中的state
const initialState = window.__INITIAL_STATE__ || { } // eslint-disable-line
console.log('周达理', JSON.stringify(initialState)) // initialState.appState

const createApp = (TheApp) => {
  // 定义一个class
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      // const jssStyles = document.getElementById('jss-server-side');
      // if (jssStyles && jssStyles.parentNode) {
      //   jssStyles.parentNode.removeChild(jssStyles);
      // }
    }
    render() {
      return <TheApp />
    }
  }
  return Main // return这个class
}

const appState = new AppState(initialState.appState)
const topicStore = new TopicStore(initialState.topicStore)

const root = document.getElementById('root') // 缓存变量 减少损耗
// AppContainer 是热更新模块一定要放在最外面
const render = (Component) => { // 定义一个渲染的函数 传入一个Component
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}
render(createApp(App)) // createApp是给这个app加上componentDidMount

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default // eslint-disable-line
    render(createApp(NextApp))
  })
}
