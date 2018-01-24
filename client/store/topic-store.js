// 专门处理跟话题  topic主题有关的数据
import {
  observable,
  // toJs,
  // computed,
  action,
  extendObservable,
} from 'mobx'
import { topicSchema } from '../util/variable-define' // 引入schema
import { get } from '../util/http'

const createTopic = (topic) => {
  return Object.assign({}, topicSchema, topic)
}

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }
  // 创建一些特性
  @observable syncing = false
}


// 创建一个class
class TopicStore {
  @observable topics
  @observable asyncing
  // 初始化我们的数据
  constructor({ syncing, topics } = { syncing: false, topics: [] }) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
  }

  // 往 this.topics添加数据的方法
  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }


  // 获取topoc数据的操作
  @action fetchTopics(tab) {
    console.log('topic-store   =>获取topoc数据的操作fetchTopics tab=', tab)
    // 不知道获取的结果是正确与否 所以return 一个promise
    return new Promise((resolve, reject) => {
      this.syncing = true
      this.topics = []
      get('/topics', {
        mdrender: false,
        tab,
      }).then((resp) => {
        if (resp.success) {
          console.log('获取的数据resp.data', resp.data)
          // 如果成功 把获取的数据 加载到topics上面
          resp.data.forEach((topic) => {
            this.addTopic(topic)
          })
          resolve()
        } else {
          reject()
        }
        this.syncing = false
      }).catch((err) => {
        reject(err)
        this.syncing = false
      })
    })
  }
}

export default TopicStore
