import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Student from './Student'
import Dashboard from '../components/Dashboard'
import StudentAccount from './StudentAccount'
import AdminHome from './AdminHome'
import AddStudent from './AddStudent'
import Payment from './Payment'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom'

const AdminDashboard = () => {
	const styles = makeStyles({
		root: {
			display: 'flex',
			height: '900px',
			backgroundColor: '#f2f2f2',
			margin: '0px',
			// border: '1px solid black',
		},
		contentContainer: {
			// backgroundColor: '#EAEAEA4F',
			width: '85%',
			height: '100%',
		}
	})
	const classes = styles()
		return (
			<div className={classes.root}>
				<Router>
				<Dashboard />
					<div className={classes.contentContainer}>
						<Switch>
							<Route exact path="/dashboard"><AdminHome /></Route>
							<Route exact path="/dashboard/addstudents"><AddStudent /></Route>
							<Route exact path="/dashboard/students"><Student /></Route>
							<Route exact path="/dashboard/accounts"><StudentAccount /></Route>
							<Route exact path="/dashboard/payments"><Payment /></Route>
						</Switch>	
					</div>
				</Router>
			</div>		
		)
}


export default AdminDashboard