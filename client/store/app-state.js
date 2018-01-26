// 控制前端交互
import {
  observable,
  computed,
  // autorun,
  action,
} from 'mobx'
import { post } from '../util/http'

let notifyId = 0

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'dali' }) {
    this.count = count
    this.name = name
  }
  // 创建一个observable的对象
  @observable user = {
    isLogin: false, // 是否登录
    info: {}, // 用户信息
  }
  // 创建一个action的对象
  @action login(accessToken) { // 登录操作
    return new Promise((resolve, reject) => {
      post('accesstoken', {}, {
        accesstoken: accessToken,
      }).then((resp) => {
        if (resp.success) {
          this.user.isLogin = true
          this.user.info = resp.data
          resolve()
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
}
