import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import List from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress'; // loding组件

import { AppState } from '../../store/app-state'
import Container from '../layout/container'
import TopicListItem from './list-item'

// @inject 注入了之后 就可以在render中获取topicStore
const initialState = window.__INITIAL_STATE__ || { } // eslint-disable-line


@inject(stores => {
  console.log('stores', stores)
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
}) @observer
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
    console.log('componentDidMount  获取topicList的数据')
    // 获取topicList的数据
    this.props.topicStore.fetchTopics()
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
    const {
      topicStore,
    } = this.props
    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing // false表示还没获取完 就可以使用loading组件

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
        <List>
          {
            // 循环我们的Topic
            topicList.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={this.listItemClick}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncingTopics ?
          (
            <div>
              <CircularProgress color="accent" size={100} />
            </div>
          ) :
          null
        }
        <div>{dali}</div>
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired, // 表示appState是一个对象 并且是必须传入的对象
  topicStore: PropTypes.object.isRequired, // 表示appState是一个对象 并且是必须传入的对象
}
