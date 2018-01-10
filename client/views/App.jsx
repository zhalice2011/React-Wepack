
// 前端主入口
import React from 'react'

import Routes from '../config/router'
// import MainAppBar from './layout/app-bar'

import MainAppBar from './layout/app-bar'

export default class App extends React.Component {
  componentDidMount() {
    // do something
  }
  render() {
    return [
      <MainAppBar />,
      <Routes key="routes" />,
    ]
  }
}
