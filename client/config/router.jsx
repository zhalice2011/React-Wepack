// 路由配置的文件
import React from 'react'
import {
  Route,
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'

export default () => [
  <Route path="/" component={TopicList} exact />,
  <Route path="/detail" component={TopicDetail} />,
]
