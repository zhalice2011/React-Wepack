
// 要做的事情就是  在服务端渲染html 给他export出去就行了
import React from 'react'
import { StaticRouter } from 'react-router-dom' // 服务端渲染的router
import { Provider, useStaticRendering } from 'mobx-react' // 服务端渲染的store

import { JssProvider } from 'react-jss'
import { MuiThemeProvider } from 'material-ui/styles'

import App from './views/App'
import { createStoreMap } from './store/store'

// 让mobx在服务端渲染的时候不会重复进行数据变换
useStaticRendering(true) // 使用静态的渲染
export default (stores, routerContext, SheetsRegistry, jss, theme, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider registry={SheetsRegistry} jss={jss}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
