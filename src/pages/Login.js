import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../css/style.css';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../components/utils/loader'
import Response from '../components/utils/response'

const Login = ({ setToken  }) => {
		{/* STATES */}
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
		const [loginResponse, setLoginResponse] = useState('')
		const [loader, setLoader] = useState(false)
		//Didn't know how to declare states as objects, that's why I coded it like this.
		{/* STYLES */}
		const styles = makeStyles({
			root: {
				backgroundColor: 'white',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
			},
			loginForm: {
				'& > div:nth-child(1)': {
					marginBottom: '60px',
				},
				'& > div:nth-child(2)': {
					marginBottom: '50px'
				},
				backgroundColor: 'white',
				display: 'flex',
				height: '400px',
				width: '550px',
				justifyContent: 'center',
				flexDirection: 'column',
				borderRadius: '20px',
			},
			headerControl: {
				marginTop: '20px',
				borderRadius: '20px 20px 0 0', 
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
			},
			inputControl: {
				display: 'flex',
				flexDirection: 'column',
				margin: '0px 25px 0px 25px',
				// width: '100%',
			},
			buttonControl: {
				"& > *": {
					margin: '5px',
				},
				fontSize: '2.5 rem',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			},
		})
		const classes = styles();

		{/* FUNCTIONS */}
		const login = async() => {
			setLoader(true)	// loader starts when starting fetch
			try{
			  await fetch("http://localhost:5000/auth/login", {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
          'username': username, 
          'password': password
				  })                                               // this is the POST request sent by the client-side
				}).then((res) => res.json()).then((data) => {    // convert the response of the server side to JSON format?
          if(data.status >= 401){                       //if status is 401, that means Unauthorized
            setLoginResponse(data.message)
          }
          else{                                         //If not then token is set for the client. 
            setToken(data.token)
            sessionStorage.setItem("userToken", data.token)
          }
			})       									
			setLoader(false)
			} 
			catch(error){
				console.log(error)
				setLoader(false)
				setLoginResponse(error.message)
			}						
		}

		const handleInput = (e) => {
			e.target.id === "username" ? setUsername(e.target.value) : setPassword(e.target.value)
				if(e.keyCode === 13){ 
					login();
				} //IF keyboard input is "enter"
		}
		{/* Render Method */}
    return(
			<div className={classes.root}>
        <Container className={classes.loginForm}>
							<div className={classes.headerControl}>
								<Typography 
									variant="h3" 
									style={{
										color: '#009933',
										fontSize: '1.5em',
									}}>
									Management Information System
								</Typography>
							</div>
							<div className={classes.inputControl}>
								<Typography style={{ fontSize: '1em' }}>
									Username:
								</Typography>
								<TextField 
									id="username" 
									variant="outlined"
									size="small"
									style={{
										width: '100%',
									}}
									onKeyUp={handleInput} 
								/>
								<Typography style={{ fontSize: '1em' }}>
								  Password:
								</Typography>
								<TextField 
									id="password" 
									variant="outlined"
									type="password" 
									size="small"
									style={{
										width: '100%',
									}}
									onKeyUp={handleInput} 
								/>
								<Response message={loginResponse} margin="0px 5px 0px 5px" />
							</div>
							<div className={classes.buttonControl}>
								<Button 
									variant="outlined"
									style={{
										backgroundColor: 'orange',
										color: 'white',
										border: 'none',
										borderRadius: '20px',
										width: '120px',
										height: '40px', 
										fontSize: '0.85em',
									}} 
									onClick={login}
								>
								  Login
								  {loader && <Loader size={30} color="primary"/>}
								</Button>
								<Typography style={{color: '#009933'}}	>
									Conperey Integrated Learning School Services
								</Typography>
							</div>	
        </Container>
			</div>
    )
}
export default Login
