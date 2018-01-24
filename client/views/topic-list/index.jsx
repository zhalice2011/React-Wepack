import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import queryString from 'query-string'
// import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import List from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress'; // loding组件

import { AppState } from '../../store/app-state'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { tabs } from '../../util/variable-define'

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
  // 每个组件都可以通过这种方式获取到router
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props) {
    super(props)
    // 设置初始的state


    // 给点击事件绑定this
    this.changeTab = this.changeTab.bind(this)
  }
  componentDidMount() {
    console.log('componentDidMount  获取topicList的数据')
    const tab = this.getTab()
    // 获取topicList的数据
    this.props.topicStore.fetchTopics(tab)
  }
  // 有新的props进来的时候的生命周期
  componentWillReceiveProps(nextProps) {
    console.log('有新的props进来的时候的生命周期 nextProps=', nextProps)
    // 如何不等于就主动获取一遍数据
    if (nextProps.location.search !== this.props.location.search) {
      // 获取topicList的数据
      console.log('nextProps.location.search', nextProps.location.search)
      const tab = this.getTab(nextProps.location.search)
      console.log('tab', tab)
      this.props.topicStore.fetchTopics(tab)
    }
  }
  // 获取当前tab的方法
  getTab(search) {
    search = search || this.props.location.search
    const query = queryString.parse(search) // 获取查询字符串 ? 后面的参数
    return query.tab || 'all' // 拿到要切换的tab值
  }


  // 路由切换的方法
  changeTab(e, value) { // 点击tab切换 e:envent事件 value获取value的值
    console.log('tab=', value)
    // 进行路由跳转
    this.context.router.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
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
    const {
      topicStore,
    } = this.props
    // console.log('topicStore', topicStore)
    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing // false表示还没获取完 就可以使用loading组件
    const tab = this.getTab() // 拿到要切换的tab值

    return (
      <Container>
        <Helmet>
          <title>周达理</title>
          <meta name="description" comtent="哈哈哈" />
        </Helmet>
        <Tabs value={tab} onChange={this.changeTab}>
          {/* {console.log('tab', tab)} */}
          {/* {console.log('tabs', tabs)} */}
          {
            Object.keys(tabs).map((value) => (
              <Tab key={value} label={tabs[value]} value={value} />
            ))
          }
        </Tabs>
        <List>
          {
            // 循环我们的Topic
            topicList.map(topic => (
              <TopicListItem
                key={topic.id}
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
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired, // 表示appState是一个对象 并且是必须传入的对象
  topicStore: PropTypes.object.isRequired, // 表示appState是一个对象 并且是必须传入的对象
}

TopicList.propTypes = {
  location: PropTypes.object.isRequired, // 其实是rect的route
}
