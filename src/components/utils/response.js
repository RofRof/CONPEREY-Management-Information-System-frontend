import { React } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/'

const 

Response = (props) => {
    
  const styles = makeStyles({
      root: {
        margin: props.margin,
        display: 'flex',
        justifyContent: 'center',
      },
      error: {
        color: 'red',
        fontsize: '1em',
      } 
  })
  const classes = styles()

  return(
    <div className={classes.root}>
      <Typography className={classes.error}>
        {props.message == "" ? "": props.message}
      </Typography>
    </div>
  )
}

export default Response