// 路由配置的文件
import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import UserLogin from '../views/user/login'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="/" />,
  <Route path="/list" component={TopicList} key="/list" />,
  <Route path="/detail/:id" component={TopicDetail} key="/detail" />,
  <Route path="/user/login" exact key="user-login" component={UserLogin} />,
]
