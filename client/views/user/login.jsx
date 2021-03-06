import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Redirect,
} from 'react-router-dom'
import queryString from 'query-string'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

import UserWrapper from './user'
import loginStyles from './styles/login-style'

@inject(stores => {
  return {
    appState: stores.appState,
    user: stores.appState.user,
  }
}) @observer
class UserLogin extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      accesstoken: '',
      helpText: '',
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }
  // 在这个生命周期里面进行判断是否登录
  componentWillMount() {
    if (this.props.user.isLogin) {
      // 已经登录就直接跳转
      this.context.router.history.replace('/user/info') // replace 可以防止用户返回
    }
  }

  getFrom(location) {
    location = location || this.props.location
    const query = queryString.parse(location.search)
    return query.from || '/user/info'
  }

  handleLogin() {
    // 判断
    if (!this.state.accesstoken) {
      return this.setState({
        helpText: '必须填写',
      })
    }
    this.setState({
      helpText: '',
    })
    return this.props.appState.login(this.state.accesstoken)
      .then((resp) => {
        // console.log('进行登录 我到这里了哦 跳转到/user/info页面', resp)
        if (resp.success) {
          this.context.router.history.replace('/user/info') // replace 可以防止用户返
        }
      })
      .catch(msg => {
        this.props.appState.notify({ message: msg })
      })
  }

  handleInput(event) {
    this.setState({
      accesstoken: event.target.value.trim(),
    })
  }

  render() {
    const { classes } = this.props
    const { isLogin } = this.props.user
    const from = this.getFrom()
    if (isLogin) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            label="请输入Cnode AccessToken"
            placeholder="请输入Cnode AccessToken"
            required
            helperText={this.state.helpText}
            value={this.state.accesstoken}
            onChange={this.handleInput}
            className={classes.input}
          />
          <Button
            raised
            color="accent"
            onClick={this.handleLogin}
            className={classes.loginButton}
          >
            登 录
          </Button>
        </div>
      </UserWrapper>
    )
  }
}

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withStyles(loginStyles)(inject((stores) => {
  return {
    appState: stores.appState,
    user: stores.appState.user,
  }
})(observer(UserLogin)))
