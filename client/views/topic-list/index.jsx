import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';

import { AppState } from '../../store/app-state'
import Container from '../layout/container'
import TopicListItem from './list-item'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor(props) {
    super(props)
    // 设置初始的state
    this.state = {
      tabIndex: 1,
      dali: '雪妮',
    }

    // 给点击事件绑定this
    this.changeTab = this.changeTab.bind(this)
    this.listItemClick = this.listItemClick.bind(this)
  }
  componentDidMount() {
    // do something
  }

  changeTab(e, index) { // 点击tab切换 e:envent事件
    this.setState({
      tabIndex: index,
    })
  }

  listItemClick() { // 点击内容的事件
    console.log('三生三世')
    this.setState({
      dali: '周达理',
    })
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
    // 读取state 解构的方式
    const {
      tabIndex,
      dali,
    } = this.state
    // 设置假数据
    const topic = {
      title: 'title',
      username: 'username',
      reply_count: 20,
      visit_count: 30,
      creat_at: 'creat_at',
      tab: 'share',
    }
    return (
      <Container>
        <Helmet>
          <title>周达理</title>
          <meta name="description" comtent="哈哈哈" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab}>
          <Tab label="全部" />
          <Tab label="分享" />
          <Tab label="工作" />
          <Tab label="问答" />
          <Tab label="精品" />
          <Tab label="测试" />
        </Tabs>
        <TopicListItem onClick={this.listItemClick} topic={topic} />
        <div>{dali}</div>
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState), // 表示appState是一个对象 并且是必须传入的对象
}
