import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import PaymentReport from './pages/report/PaymentReport'
import AccountReport from './pages/report/AccountReport'
import Test from './pages/Test'
import PrivateRoutes from './components/PrivateRoute'
import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
}   from 'react-router-dom'

const App = () => {
let sessionToken = sessionStorage.getItem("userToken")
const [token, setToken] = useState(sessionToken)
const [isAuth, setAuth] = useState(false)

//used to verify token everytime a user visits a page
const verifyToken = async(userToken) => {
	try{
		await fetch("http://localhost:5000/auth/verify", {
			method: 'GET',
			headers: { 
								'Content-Type': 'application/json', 
								'token' : userToken
			},
		}).then((res) => res.json()).then((data) => data === true ? setAuth(true) : setAuth(false))
	}
	catch(error){
		return error
	}
}

useEffect(() => {
	verifyToken(token)
})

return (
		<Router>
			<div>
				<Switch> {/* Verify if token is present and redirect to the supposed page if correct. */}
					<Route exact path="/test" component={Test} />
					<Route exact path="/" render={() =>
						!isAuth
						?
						(<Login setToken={setToken} verifyToken={verifyToken}/>)
						:
						(<Redirect to="/dashboard"/>) 
					}/>
					<PrivateRoutes exact path="/dashboard" component={AdminDashboard}/>
					<PrivateRoutes exact path="/dashboard/students" component={AdminDashboard}/>
					<PrivateRoutes exact path="/dashboard/accounts" component={AdminDashboard}/>
					<PrivateRoutes exact path="/dashboard/payments" component={AdminDashboard}/>
					<PrivateRoutes exact path="/dashboard/addstudents" component={AdminDashboard}/>
					<PrivateRoutes path="/report/payment" component={PaymentReport}/>
					<PrivateRoutes exact path="/report/account" component={AccountReport}/>
				</Switch>
			</div>
		</Router>
  )
}

export default App;

