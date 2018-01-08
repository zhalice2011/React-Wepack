import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Button from 'material-ui/Button';

import { AppState } from '../../store/app-state'


@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor(props) {
    super(props)
    this.changeName = this.changeName.bind(this)
  }
  componentDidMount() {
    // do something
  }
  changeName(event) {
    // this.props.appState.name = event.target.value
    this.props.appState.changeName(event.target.value)
  }

  asyncBootstrap() { // 执行数据初始化
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      })
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>周达理</title>
          <meta name="description" comtent="哈哈哈" />
        </Helmet>
        <Button raised color="primary">周达理</Button>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.count}This is topic list</span>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState), // 表示appState是一个对象 并且是必须传入的对象
}
