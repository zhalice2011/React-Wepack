import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import {
  inject,
  observer,
} from 'mobx-react'
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },

}
@inject((stores) => {
  return {
    appState: stores.appState,
  }
}) @observer
class MainAppBar extends React.Component {
  // 每个组件都可以通过这种方式获取到router
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.onHomeIconClick = this.onHomeIconClick.bind(this)
    this.createButtonClick = this.createButtonClick.bind(this)
    this.loginButtonClick = this.loginButtonClick.bind(this)
  }
  /* eslint-disable */
  componentDidMount() {
    // do something
  }
  onHomeIconClick() {

  }
  createButtonClick() {
    
  }
  loginButtonClick() {
    if (this.props.appState.user.isLogin) { // 如果登录了点击名字就跳转到个人信息页
      this.context.router.history.push('/user/info')
    } else{
      this.context.router.history.push('/user/login')
    }
  }
  /* eslint-enable */
  render() {
    const { classes } = this.props
    // 获取我们的user
    const {
      user,
    } = this.props.appState
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <ToolBar>
            <IconButton color="contrast" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>JNode</Typography>
            <Button raised color="accent" onClick={this.createButtonClick}>新建话题</Button>
            <Button color="contrast" onClick={this.loginButtonClick}>
              {
                // 判断是不是登录状态修改显示的内容
                user.isLogin ? user.info.loginname : '登录'
              }
            </Button>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}


MainAppBar.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired, // 表示appState是一个对象 并且是必须传入的对象
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired, // 必须要传入的
}


export default withStyles(styles)(MainAppBar) // 将styles作为props传入MainAppBar
