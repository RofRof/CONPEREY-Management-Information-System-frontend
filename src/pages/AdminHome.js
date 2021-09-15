import {React, useState} from 'react'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Card from '@material-ui/core/Card'

import { makeStyles } from '@material-ui/core'

import ActionButton from '../components/utils/button'

const AdminHome = () => {

  const [state, setState] = useState({
    schoolyear: 2020,
  })

  const styles = makeStyles({
    root: {
      backgroundColor: 'white',
      margin: '25px 25px 0px 25px',
      height: '500px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > div': { 
        marginTop: '30px',
        width: '95%',
      },
      '& > div:nth-child(1)': { //header content
        borderBottom: '1px solid #b2b2b2',
        display: 'flex',
        justifyContent: 'space-between',
        '& > p:nth-child(1)': {
          fontSize: '1.1em',
          fontWeight: 'bold',
        },
        '& > p:nth-child(2)': {
          fontWeight: 'bold',
        }
      },
      '& > div:nth-child(2)': {
        marginTop: '80px',
        height: '90%',
      },
    },
    cardsContainer: { //container for rows of cards
      display: 'grid',
      justifyContent: 'center',
      gridTemplateColumns: 'repeat(5, 200px)',
      gap: '20px',
      '& > div ': { //container for individual card + button
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '325px',
        '& > div:nth-child(1)': { //individual cards
          height: '260px',
          marginBottom: '10px',
          '& > p': {
            textAlign: 'center',
            fontFamily: 'Nunito',
            color: '#424242',
            fontSize: '0.9em',
          },
        },
        '& > div:nth-child(2)': { //container for select button
          width: '75%',
        },
      },
    },
    image: {
      width: '100%',
      height: '125px',
    },
  })
  const classes = styles()

  const schoolYearDatabases = (
    <div className={classes.cardsContainer}>
      <div>
        <Card>
          <img src='../../images/loginBackground.png' className={classes.image}/>
          <Typography>School Year</Typography>
          <Typography>2020 - 2021</Typography>
        </Card>
        <div>
          <ActionButton width text="Select" color="orange"/>
        </div>
      </div>
      <div>
        <Card>
          <img src='../../images/loginBackground.png' className={classes.image}/>

          <Typography>School Year</Typography>
          <Typography>2021 - 2022</Typography>
        </Card>
        <div>
          <ActionButton text="Select" color="orange"/>
        </div>
      </div>
      <div>
        <Card>  
          <img src='../../images/loginBackground.png' className={classes.image}/>
          <Typography>School Year</Typography>
          <Typography> 2022 - 2023</Typography>
        </Card>
        <div>
          <ActionButton  text="Select" color="orange"/>
        </div>
      </div>
      <div>
        <Card>  
          <img src='../../images/loginBackground.png' className={classes.image}/>
          <Typography>School Year</Typography>
          <Typography> 2022 - 2023</Typography>
        </Card>
        <div>
          <ActionButton  text="Select" color="orange"/>
        </div>
      </div>
      <div>
        <Card>  
          <img src='../../images/loginBackground.png' className={classes.image}/>
          <Typography>School Year</Typography>
          <Typography> 2022 - 2023</Typography>
        </Card>
        <div>
          <ActionButton  text="Select" color="orange"/>
        </div>
      </div>
    </div>

  )
      
  return(
    <div className={classes.root}>
      <div>
        <Typography>School Year Database</Typography>
        <Typography>SY 2020 - 2021</Typography>
      </div>
      <div>
        {schoolYearDatabases}
      </div>
    </div>
  )
}

export default AdminHome