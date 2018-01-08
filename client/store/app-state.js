// 控制前端交互
import {
  observable,
  computed,
  // autorun,
  action,
} from 'mobx'

export default class AppStateClass {
  constructor({ count, name } = { count: 0, name: 'dali' }) {
    this.count = count
    this.name = name
  }
  @observable count
  @observable name
  @computed get msg() {
    return `${this.name} say the count is ${this.count}`
  }
  @action add() {
    this.count += 1
  }
  @action changeName(name) {
    this.name = name
  }
  toJson() { // 拿到服务端的store渲染
    return {
      count: this.count,
      name: this.name,
    }
  }
}
