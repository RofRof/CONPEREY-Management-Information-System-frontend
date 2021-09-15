import  React,{ useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import { makeStyles } from '@material-ui/core'

const PaymentReport = () => {
  const [query, setQuery] = useState(() => {
    let URL = window.location
    let queryString = URL.search //example: www.test.com/payments?object=foo returns object=foo
    let params = new URLSearchParams(queryString) //declare URLSearchParams class  
    let fromDate = params.get('from').toString()  //get value of params
    let toDate = params.get('to').toString()
    let schoolyear = params.get('schoolyear').toString()
    return {
      fromDate: fromDate,
      toDate: toDate,
      schoolyear: schoolyear
    }
  })
  const [monthInterval, setMonthInterval] = useState(() => {
    let URL = window.location
    let queryString = URL.search
    let params = new URLSearchParams(queryString)
    let fromDate = params.get('from').toString()
    let toDate = params.get('to').toString()
    let date1 = new Date(fromDate)
    let date2 = new Date(toDate)
    let startMonth = date1.toDateString().substr(4)
    let endMonth = date2.toDateString().substr(4)
    return {
      startMonth: startMonth,
      endMonth: endMonth
    }
  })
  const [userToken, setUserToken] = useState(sessionStorage.getItem('userToken'))
  const [paymentList, setPaymentList] = useState([])
  const [page, setPage] = useState(0)

  /////////////////////       STYLE      /////////////////////
  const style = makeStyles({
    root: {
      width: '1300px',
      heigth: '900px',
    },
    content: {
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
      height: '850px',
    },
    tableContent: {
      '& > tr:nth-child(1)': {
        '& > td': {
          fontWeight: 'bold',
          color: '#424242',
        },
        '& > td:nth-child(4)': {
          width: '150px'
        },
      },
      '& > tr > td': {
        color: '#424242'
      },
    },
    tablePagination: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    grandTotal: {
      textAlign: 'right',
      '& > p': {
        color: '#424242',
        '& > span:nth-child(1)': {
          fontWeight: 'bold',
          borderTop: '1px solid lightgray',
          borderLeft: '1px solid lightgray',
          borderBottom: '1px solid lightgray',
          padding: '10px'
        },
        '& > span:nth-child(2)': {
          borderTop: '1px solid lightgray',
          borderRight: '1px solid lightgray',
          borderBottom: '1px solid lightgray',
          padding: '10px'
        },
      },
    },
  })
  const classes = style()
  
  /////////////////////      FUNCTIONS      /////////////////////
  const getReport = async() => {
    try{
      await fetch(`http://localhost:5000/payment/report/${query.fromDate}/${query.toDate}/${query.schoolyear}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: userToken
        },
      }).then((res) => res.json()).then((data) => {
        setPaymentList(data.rows)
      })
    }
    catch(error){
      return error
    }
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  } 

  useEffect(() => {
    getReport()
  }, [])

  /////////////////////      RENDER      /////////////////////
  const paymentReport = () => {
    if(paymentList.length !== 0){
      let reports = paymentList /// studentaccounts rows list
      paymentList.length < 14 /// this is a function to only show 5 rows per page
      ?  reports = paymentList.slice(page, paymentList.length) 
      : reports = paymentList.slice(page * 14 , (page + 1) * 14)

      return reports.map((payment, i) => {
        const payment_date = new Date(payment.payment_date).toDateString().substr(4)
        const student_name = payment.lastname.toUpperCase().concat(', ', payment.firstname, ' ', payment.middleini)
        return(
          <TableRow>
            <TableCell>{payment_date}</TableCell>
            <TableCell>{student_name}</TableCell>
            <TableCell>{payment.gradelevel}</TableCell>
            <TableCell>P{payment.prev_balance}</TableCell>
            <TableCell>P{payment.entrance}</TableCell>
            <TableCell>P{payment.misc}</TableCell>
            <TableCell>P{payment.aralinks}</TableCell>
            <TableCell>P{payment.books}</TableCell>
            <TableCell>P{payment.total_tuition}</TableCell>
            <TableCell>P{payment.amount}</TableCell>
          </TableRow>
        )
      })
    }
    else{
      return(
        <TableRow>
          <TableCell align='center' colSpan={9} style={{ height: '500px', border: 'none' }}>No payment transactions found</TableCell>
        </TableRow>
      )
    }
  }

  const getAmountTotal = () => {
    if(paymentList.length !== 0){
      const amount = paymentList.map((x) => x.amount)
      const total = amount.reduce((a, b) => a + b)
      return(
        <React.Fragment>
          <Typography><span>Total:</span><span>P{total}</span></Typography>
        </React.Fragment>
      )
    }
    else{
      return(
        <React.Fragment>
          <Typography>P0</Typography>
        </React.Fragment>
      )
    }
  }
  
  
  return(
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography>Conperey Integrated Learning School</Typography>
        <Typography>Payment Report SY {`${query.schoolyear} - ${parseInt(query.schoolyear) + 1}`}</Typography>
        <Typography>{`${monthInterval.startMonth} - ${monthInterval.endMonth}`}</Typography>
      </div>
      <TableContainer className={classes.table}>
        <Table className={classes.tableContent}>
          <TableRow>
            <TableCell>Payment Date</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Gradelevel</TableCell>
            <TableCell>Previous Balance</TableCell>
            <TableCell>Entrance</TableCell>
            <TableCell>Misc</TableCell>
            <TableCell>Aralinks</TableCell>
            <TableCell>Books</TableCell>
            <TableCell>Tuition</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
          {paymentReport()}
        </Table>
      </TableContainer>
      <div className={classes.grandTotal}>
        {getAmountTotal()}
      </div>
      <div className={classes.tablePagination}>
        <TablePagination 
          count={paymentList.length}
          rowsPerPage={14}
          page={page}
          rowsPerPageOptions={false}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  )
}

export default PaymentReport


