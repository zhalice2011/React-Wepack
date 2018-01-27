// 控制前端交互
import {
  observable,
  computed,
  // autorun,
  action,
} from 'mobx'

import { post, get } from '../util/http'

let notifyId = 0

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'dali' }) {
    this.count = count
    this.name = name
  }
  @observable activeNotifications = []
  @observable notifications = []
  // 创建一个observable的对象
  @observable user = {
    isLogin: false, // 是否登录
    info: {}, // 用户信息
    detail: { // 用户详细信息
      recentTopics: [],
      recentReplices: [],
      syncing: false,
    },
    collections: { // 用户收藏的列表
      syncing: false,
      list: [],
    },
  }
  // 创建一个action的对象
  @action login(accessToken) { // 登录操作
    return new Promise((resolve, reject) => {
      post('accesstoken', {}, {
        accesstoken: accessToken,
      }).then((resp) => {
        console.log('resp', resp)
        if (resp.success) {
          // console.log('达理我到这里啦')
          this.user.isLogin = true
          this.user.info = resp
          // console.log('登录之后的this.user', JSON.stringify(this.user.info))
          resolve(resp)
        } else {
          reject(resp)
        }
      }).catch(reject)
    })
  }
  // 好吧这个我也不清楚是啥
  @action notify(config) {
    config.id = notifyId
    notifyId += 1
    this.activeNotifications.push(config)
  }

  // 获取用户信息
  @action getUserDetail(name) {
    // console.log('传入的name', name)
    this.user.detail.syncing = true
    // console.log('跳转之后之后的this.user', JSON.stringify(this.user.info))
    // console.log('this.user', this.user)
    // console.log('this.user.info', this.user.info)
    // console.log('this.user.info.loginname', this.user.info.loginname)
    return new Promise((resolve, reject) => {
      get(`user/${this.user.info.loginname}`)
        .then((resp) => {
          // console.log('用户详情页resp', resp)
          if (resp.success) { // recent_topics
            // console.log('resp.data', resp.data)
            // console.log('resp.data.recent_replices', resp.data.recent_replies)
            // console.log('resp.data.resp.data.recent_topics', resp.data.recent_topics)
            this.user.detail.recentReplices = resp.data.recent_replies
            this.user.detail.recentTopics = resp.data.recent_topics
            resolve()
          } else {
            reject()
          }
          this.user.detail.syncing = false // 请求已经结束了设置成false
        })
        .catch((err) => {
          this.user.detail.syncing = false // 请求已经结束了设置成false
          reject(err)
        })
    })
  }

  // 获取用户收藏的列表
  @action getUserCollection() {
    this.user.collections.syncing = true
    return new Promise((resolve, reject) => {
      get(`topic_collect/${this.user.info.loginname}`)
        .then(resp => {
          console.log('用户收藏的列表', resp)
          if (resp.success) {
            this.user.collections.list = resp.data
            resolve()
          } else {
            reject(resp.data.msg)
            this.notify({ message: resp.data.msg })
          }
          this.user.collections.syncing = false
        }).catch(err => {
          reject(err.message)
          this.notify({ message: err.msg })
          this.user.collections.syncing = false
        })
    })
  }
}
