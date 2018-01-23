//
import AppState from './app-state'
import TopicStore from './topic-store'

// export const AppState = AppStateClass
export {
  AppState,
  TopicStore,
}
export default {
  AppState,
  TopicStore,
}

// 给服务端渲染提供一个函数
export const createStoreMap = () => {
  return {
    appState: new AppState(),
    topicStore: new TopicStore(),
  }
}
