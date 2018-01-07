// 控制前端交互
import {
  observable,
  computed,
  autorun,
  action,
} from 'mobx'
import { setInterval } from 'timers';

export class AppState {
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


const appState = new AppState()

autorun(() => {
  console.log(appState.msg)
  // console.log("autorun方法",appState.msg)
})

setInterval(() => {
  appState.add()
}, 1000)

export default appState
