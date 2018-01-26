// 专门处理跟话题  topic主题有关的数据
import {
  observable,
  // toJs,
  computed,
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
  @observable details
  @observable syncing = false
  @observable tab = undefined
  // 初始化我们的数据   设置默认值
  /* eslint-disable */ 
  constructor({ syncing = false, topics = [], tab = null, details = [] } = {},) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(detail => new Topic(createTopic(detail)))
    this.tab = tab
  }
  /* eslint-enable */
  // constructor({ syncing = false, topics = [], tab = null, details = [], } = {}, ) {
  //   this.syncing = syncing
  //   this.topics = topics.map(topic => new Topic(createTopic(topic)))
  //   this.details = details.map(detail => new Topic(createTopic(detail)))
  // }

  // 往 this.topics添加数据的方法
  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }
  @computed get topicMap() {
    return this.topics.reduce((result, topic) => {
      result[topic.id] = topic
      return result
    }, {})
  }

  @computed get detailsMap() {
    return this.details.reduce((result, topic) => {
      result[topic.id] = topic
      return result
    }, {})
  }
  // // 获取某一个id
  // @computed detailMap() {
  //   return this.details.reduce((result, detail) => {
  //     result[detail.id] = detail
  //     return result
  //   }, {})
  // }

  // 获取topoc数据的操作
  @action fetchTopics(tab) {
    // console.log('topic-store   =>获取topoc数据的操作fetchTopics tab=', tab)
    // 不知道获取的结果是正确与否 所以return 一个promise
    return new Promise((resolve, reject) => {
      this.syncing = true
      this.topics = []
      get('/topics', {
        mdrender: false,
        tab,
      }).then((resp) => {
        if (resp.success) {
          // console.log('获取的数据resp.data', resp.data)
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

  // 点击某个文字获取详情的操作
  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      console.log('getTopicDetail =id', id)
      // 话题数据缓存到store中的details
      if (this.detailsMap[id]) { // 如果有id了
        resolve(this.detailsMap[id])
      } else { // 去服务端进行获取
        console.log('getTopicDetail2 =id', id)
        get(`/topic/${id}`, {
          mdrender: false,
        }).then(resp => {
          if (resp.success) {
            // 创建一个Topic对象
            const topic = new Topic(createTopic(resp.data))
            this.details.push(topic)
            resolve(topic)
          } else {
            reject()
          }
        }).catch(reject)
      }
    })
  }
}

export default TopicStore
