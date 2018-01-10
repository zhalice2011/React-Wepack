import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    margin: 24,
    marginTop: 80,
  },
}

// const Container = ({ classes, children }) => (
//   <Paper elevation={4} className={classes.root} >
//     {children}
//   </Paper>
// )

const Container = ({ classes, children }) => {
  console.log('dali')
  return (
    <Paper elevation={4} className={classes.root} >
      {children}
    </Paper>
  )
}


Container.propTypes = {
  classes: PropTypes.object.isRequired, // 必须要传入的
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
}

export default withStyles(styles)(Container)
