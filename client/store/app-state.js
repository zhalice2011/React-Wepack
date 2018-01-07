// 控制前端交互
import {
  observable,
  computed,
  // autorun,
  action,
} from 'mobx'

export default class AppStateClass {
  @observable count = 0
  @observable name = 'dali'
  @computed get msg() {
    return `${this.name} say the count is ${this.count}`
  }
  @action add() {
    this.count += 1
  }
  @action changeName(name) {
    this.name = name
  }
}
