import React from 'react'
import PropTypes from 'prop-types'

import ListItem from 'material-ui/List/ListItem'
import ListItemAvatar from 'material-ui/List/ListItemAvatar' // 头像
import ListItemText from 'material-ui/List/ListItemText' // 文字
import Avatar from 'material-ui/Avatar' // 头像组件
import { withStyles } from 'material-ui/styles'
// import IconHome from 'material-ui-icons/Home'

import {
  topicPrimaryStyle,
  topicSecondaryStyles,
} from './styles'


const Primary = ({ classes, topic }) => {
  // console.log('Primary组件topic=', topic)
  return (
    <div className={classes.root}>
      <span className={classes.tab}>{topic.tab}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}

const Secondary = ({ classes, topic }) => {
  // console.log('Secondary组件topic=', topic)
  // console.log('Secondary组件classes=', classes)
  return (
    <span className={classes.root}>
      <span className={classes.username}>{topic.author.loginname}</span>
      <span className={classes.count}>
        <span className={classes.accentColor}>{topic.reply_count}</span>
        <span>/</span>
        <span>{topic.visit_count}</span>
      </span>
      <span>创建时间: {topic.create_at}</span>
    </span>
  )
}


Primary.propTypes = {
  topic: PropTypes.object.isRequired, // 必传
  classes: PropTypes.object.isRequired, // 必传
}
Secondary.propTypes = {
  topic: PropTypes.object.isRequired, // 必传
  classes: PropTypes.object.isRequired, // 必传
}
// 加了自定义样式的组件  StylePrimary
const StylePrimary = withStyles(topicPrimaryStyle)(Primary)
const StyleSecondary = withStyles(topicSecondaryStyles)(Secondary)


const TopicListItem = ({ onClick, topic }) => {
  return (
    <ListItem button onClick={onClick} >
      <ListItemAvatar>
        {/* <IconHome /> */}
        <Avatar src={topic.author.avatar_url} />
      </ListItemAvatar>
      <ListItemText
        primary={<StylePrimary topic={topic} />} // 一个小组件
        secondary={<StyleSecondary topic={topic} />} // 一个小组件
      />
    </ListItem>
  )
}

TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired, // 点击函数 必传
  topic: PropTypes.object.isRequired, // 数据必传
}

export default TopicListItem
