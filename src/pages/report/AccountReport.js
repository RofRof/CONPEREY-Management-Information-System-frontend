import React, { useState, useEffect } from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

const AccountReport = () => {
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date()
    const today = date.toDateString().substr(4)
    return today
  })
  const [accountList, setAccountList] = useState([])
  const styles = makeStyles({ 
    root: {
      width: '1300px',
      heigth: '900px',
    }, 
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > p:nth-child(1)': {
        fontSize: '1.1em',
        fontWeight: 'bold',
      },
    },
    table: {
      marginTop: '15px',
      height: '850px'
    },
    tableContent: {
      '& > tr:nth-child(1) > td': {
        fontWeight: 'bold',
        color: '#424242'
      },
      '& > tr > td': {
        color: '#424242',
        fontSize: '0.85em',
      },
    },
    
  })
  const classes = styles()

  const getAccounts = async() => {
    const { userToken, schoolyear, gradeLevel } = window.opener.payLoad
    await fetch('http://localhost:5000/account/viewStudentAccounts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: userToken,
          schoolyear: schoolyear,
          gradelevel: gradeLevel,
        },
      }).then((res) => res.json()).then((data) => {
        setAccountList(data.rows)
      })
  }

  useEffect(() => {
    if(window.opener !== null){
      getAccounts()
    }
  }, [])

  const tuitionFee = () => {
    const month = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
    return(
      <React.Fragment>
        {month.map((x) => <TableCell>{x}</TableCell>)}
      </React.Fragment>
    )
  }
  const accountReport = () => {
    if(accountList !== undefined && accountList.length !== 0){
      const accounts = accountList.map((account, i) => {
        return(
          <TableRow>
            <TableCell>{account.lastname.toUpperCase().concat(', ', account.firstname + ' ' + account.middleini)}</TableCell>
            <TableCell>P{account.prev_balance}</TableCell>
            <TableCell>P{account.entrance}</TableCell>
            <TableCell>P{account.misc}</TableCell>
            <TableCell>P{account.aralinks}</TableCell>
            <TableCell>P{account.books}</TableCell>
            <TableCell>P{account.tuition[0]}</TableCell>
            <TableCell>P{account.tuition[1]}</TableCell>
            <TableCell>P{account.tuition[2]}</TableCell>
            <TableCell>P{account.tuition[3]}</TableCell>
            <TableCell>P{account.tuition[4]}</TableCell>
            <TableCell>P{account.tuition[5]}</TableCell>
            <TableCell>P{account.tuition[6]}</TableCell>
            <TableCell>P{account.tuition[7]}</TableCell>
            <TableCell>P{account.tuition[8]}</TableCell> 
            <TableCell>P{account.total_balance}</TableCell> 
          </TableRow>
        )
      })
      return accounts
    }
    else{
      return(
        <TableRow>
          <TableCell>No transactions found</TableCell>
        </TableRow>
      )
    }
  }

  return(
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography>Conperey Integrated Learning School</Typography>
        <Typography>Grade 1 SY 2020-2021</Typography>
        <Typography>{currentDate}</Typography>
      </div>
      <TableContainer className={classes.table}>
        <Table className={classes.tableContent}>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Prev Bal</TableCell>
            <TableCell>Entrance</TableCell>
            <TableCell>Misc</TableCell>
            <TableCell>Aralinks</TableCell>
            <TableCell>Books</TableCell>
            {tuitionFee()}
            <TableCell>Total</TableCell>
          </TableRow>
          {accountReport()}
        </Table>
      </TableContainer>
    </div>
  )
}

export default AccountReport