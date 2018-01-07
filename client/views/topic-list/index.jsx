import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../../store/app-state'

@inject('appState')
@observer
export default class TopicList extends React.Component {
  constructor(props) {
    super(props)
    this.changeName = this.changeName.bind(this)
  }
  componentDidMount() {
    // do something
  }
  changeName(event) {
    // this.props.appState.name = event.target.value
    this.props.appState.changeName(event.target.value)
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.msg}This is topic list</span>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState), // 表示appState是一个对象 并且是必须传入的对象
}
