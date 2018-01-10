import React from 'react'
import PropTypes from 'prop-types'

import ListItem from 'material-ui/List/ListItem'
import ListItemAvatar from 'material-ui/List/ListItemAvatar' // 头像
import ListItemText from 'material-ui/List/ListItemText' // 文字
import Avatar from 'material-ui/Avatar' // 头像组件

// import IconHome from 'material-ui-icons/Home'

const Primary = ({ topic }) => {
  console.log('Primary组件topic=', topic)
  return (
    <div>
      <span>{topic.tab}</span>
      <span>{topic.title}</span>
    </div>
  )
}

const Secondary = ({ topic }) => {
  console.log('Secondary组件topic=', topic)
  return (
    <div>
      <span>{topic.username}</span>
      <span>
        <span>{topic.reply_count}</span>
        <span>/</span>
        <span>{topic.visit_count}</span>
      </span>
      <span>创建时间: {topic.creat_at}</span>
    </div>
  )
}


Primary.propTypes = {
  topic: PropTypes.object.isRequired, // 必传
}
Secondary.propTypes = {
  topic: PropTypes.object.isRequired, // 必传
}

const TopicListItem = ({ onClick, topic }) => {
  console.log('防止eslint报错')
  return (
    <ListItem button onClick={onClick} >
      <ListItemAvatar>
        {/* <IconHome /> */}
        <Avatar src={topic.image} />
      </ListItemAvatar>
      <ListItemText
        primary={<Primary topic={topic} />} // 一个小组件
        secondary={<Secondary topic={topic} />} // 一个小组件
      />
    </ListItem>
  )
}

TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired, // 点击函数 必传
  topic: PropTypes.object.isRequired, // 数据必传
}

export default TopicListItem
