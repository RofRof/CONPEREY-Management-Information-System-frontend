import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import Loader from './loader'

const ActionButton = (props) => {
  
  const styles = makeStyles({
    root: {
      '& :hover': {
        color: 'white',
        backgroundColor: props.color,
      },
    },
    rootButton: {
      fontSize: '0.75em',
      backgroundColor: props.color,
      margin: '0px',
      width: '100%',
      color: 'white',
      border: 'none',
      height: '35px',
    },
  })
  const classes = styles()

  return(
    <div className={classes.root}>
      <Button 
        id={props.id}
        variant="outlined" 
        className={!props.className ? classes.rootButton : props.className} 
        onClick={props.onClick}
      >
        {props.text != "" ? props.text : "Button"}
        {props.loader && <Loader color={props.loaderColor} size={props.loaderSize}/>}
      </Button>
    </div>
  )
}

export default ActionButton