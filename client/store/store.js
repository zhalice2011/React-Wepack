//
import AppStateClass from './app-state'
// import AppState from './app-state';

export const AppState = AppStateClass
export default {
  AppState,
}

// 给服务端渲染提供一个函数
export const createStoreMap = () => ({
  // return {
  appState: new AppState(),
  // }
})
