import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'


const PrivateRoutes = ({  component: Component, ...rest}) => {
  const [isAuth, setAuth] = useState(true)

  const verifyToken = async() => {
    try{
      await fetch("http://localhost:5000/auth/verify", {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
          'token' : sessionStorage.getItem("userToken")
        },
      }).then((res) => res.json()).then((data) => data === true ? setAuth(true) : setAuth(false))
    }
    catch(error){
      console.log(error)  
      return error
    }
  }

  useEffect(() => {
    verifyToken()
  })

  return(
    <Route {...rest} render={() => {
      if(isAuth) {
        return <Component isAuth={isAuth} setAuth={setAuth}/>
      }
      else if(!isAuth){
        return <Redirect to="/"/>
      }
    }} />
  )
}

export default PrivateRoutes