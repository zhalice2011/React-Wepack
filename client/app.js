
import React from 'react'

import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'
 
import App from './App.jsx'



const root = document.getElementById("root") //缓存变量 减少损耗
const render = Component =>{  //定义一个渲染的函数 传入一个Component
    ReactDOM.hydrate(
        <AppContainer>
            <Component/>
        </AppContainer>,
        root
    )
}
render(App)

if (module.hot) {
    module.hot.accept('./App.jsx',()=>{
        const NextApp = require('./App.jsx').default
        render(NextApp)
        
    })
}