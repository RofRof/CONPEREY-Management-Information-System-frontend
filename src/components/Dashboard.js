import { React, useCallback } from 'react'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
					AssignmentIndOutlined,
					AssignmentOutlined,
					PaymentOutlined,
					PowerSettingsNewOutlined,
					AccountCircleOutlined,
					AddCircleOutlineOutlined
			 } from '@material-ui/icons'

const Dashboard = () => {
	
	const styles = makeStyles({
    dashboardContainer: {
			width: '15%',
			display: 'flex',
			flexDirection: 'column',
			backgroundColor: 'white',
		},
		dashboard: {		
			padding: '0px',
		},
		listHeader: {
			backgroundColor: '#06B640',
			height: '40px',
			'& > a':{
				width: '100%',
				fontFamily: 'Roboto, sans-serif',
				fontSize: '1em',
				fontWeight: 'bold',
				color: 'white',
				textAlign: 'center',
				textDecoration: 'none',
			},	
		},
		accountIcon: {
			width: '35px',
			height: '35px',
			color: '#424242',
		},
		link: {
			color: '#424242', //dark gray
			textDecoration: 'none',
			'& > div':{
				display: 'flex',
				'& > p': {
						marginLeft: '15px',
						fontWeight: 'initial',
						fontSize: '0.9em',
				},
			},
		},
		linkIcons: {
			color: '#424242',
		},
  })
  const classes = styles()

	const userLogout = (e) => {
		sessionStorage.clear()
		window.location.href = "/"
	}
	
  return(
    <div className={classes.dashboardContainer}>
			<div>
				<List className={classes.dashboard}>
						<ListItem>
							<AccountCircleOutlined className={classes.accountIcon} />
							<Typography className={classes.link}>Rolf Ian Rey</Typography>
						</ListItem>
						<Divider />
						<Link to="/dashboard/addstudents" className={classes.link}>
						<ListItem button>
							<AddCircleOutlineOutlined className={classes.linkIcons}/>
							<Typography>Enroll Student</Typography>
						</ListItem>
						</Link>
						<Link to="/dashboard/students" className={classes.link}>
							<ListItem button>
								<AssignmentIndOutlined className={classes.linkIcons}/>
								<Typography>Students</Typography>
							</ListItem>
						</Link>
						<Link to="/dashboard/accounts" className={classes.link}>
							<ListItem button>
								<AssignmentOutlined className={classes.linkIcons}/>
								<Typography>Accounts</Typography>
							</ListItem>
						</Link>
						<Link to="/dashboard/payments" className={classes.link}>
							<ListItem button>
								<PaymentOutlined className={classes.linkIcons}/>
								<Typography>Payments</Typography>
							</ListItem>		
						</Link>			
						<ListItem id="/logout" button className={classes.link} onClick={userLogout}>
							<div>
								<PowerSettingsNewOutlined className={classes.linkIcons}/>
								<Typography>Logout</Typography>
							</div>
						</ListItem>			
				</List>
			</div>
		</div>

  )
}

export default Dashboard