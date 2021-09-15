import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles';

const Loader = (props) => {
 
  const styles = makeStyles({
    root: {
      margin:  '0px 10px 0px 10px',
      display: 'block',
    }
  })
  const classes = styles()
  
  return(
    <div>
      <CircularProgress 
        size={props.size != "" ? props.size : 20} 
        color={props.color != "" ? props.color : "primary" } 
        className={classes.root}
      />
    </div>
  )
}

export default Loader