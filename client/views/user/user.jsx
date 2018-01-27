import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'

import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'

import UserIcon from 'material-ui-icons/AccountCircle'

// import Container from '../components/container'
import Container from '../components/container'
import userStyles from './styles/user-style'
// import UserInfo from './info'
// 使用inject从stores中获取数据 填入组件中
@inject(stores => {
  return {
    user: stores.appState.user,
  }
}) @observer
class User extends React.Component {
  componentDidMount() {
    // do someting here
  }

  render() {
    const { classes } = this.props
    const { isLogin } = this.props.user
    const user = this.props.user.info || {}
    // console.log('user的信息', user)
    return (
      <Container>
        <div className={classes.avatar}>
          <div className={classes.bg} />
          {
            user.avatar_url ?
              <Avatar className={classes.avatarImg} src={user.avatar_url} /> :
              <Avatar className={classes.avatarImg}>
                <UserIcon />
              </Avatar>
          }
          <span className={classes.userName}>{user.loginname || '未登录'}</span>
        </div>
        {this.props.children}
        {/* <UserInfo /> */}
      </Container>
    )
  }
}

User.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
}

export default withStyles(userStyles)(User)
