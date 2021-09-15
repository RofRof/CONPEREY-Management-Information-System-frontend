import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import AutoComplete from '@material-ui/lab/Autocomplete'
import TextField  from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import CircularProgress from '@material-ui/core/CircularProgress'
import ActionButton from '../components/utils/button'
import Collapse from '@material-ui/core/Collapse'
import Modal from '@material-ui/core/Modal'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Scrollbars } from 'react-custom-scrollbars'
import debounce from 'lodash/debounce'

const Payment = () => {
  // get current date
  const getDate = () => {
    const date = new Date()
    const day = [(date.getDate().toString().length == 1 ? '0' : '') + date.getDate().toString()]  //converts 8 to 08
    const month = [((date.getMonth() + 1).toString().length == 1 ? '0' : '') + (date.getMonth() + 1).toString()]
    const year = [date.getFullYear()]
    const today = year.concat(month, day).join('-')
    return today
  }
  //////////////////        STATE           ///////////////////////
  const [state, setState] = useState({
    token: sessionStorage.getItem('userToken'),
    schoolyear: 2020,
  })
  const [searchName, setSearchName] = useState('')
  const [paymentDate, setPaymentDate] = useState(() => getDate())
  const [fromDate, setFromDate] = useState(() => getDate())
  const [toDate, setToDate] = useState(() => getDate())
  const [number, setNumber] = useState(0)
  const [paymentList, setPaymentList] = useState([])
  const [searchOptions, setSearchOptions] = useState([])
  const [feesCollapse, setFeesCollapse] = useState([])
  const [paymentListLoader, setPayListLoader] = useState(false)
  const [refundLoader, setRefundLoader] = useState(false)
  const [collapse, setCollapse] = useState(false)
  const [refundModal, setRefundModal] = useState(false)
  const [reportModal, setReportModal] = useState(false)

  const styles = makeStyles({
    root: {
      backgroundColor: 'white',
      margin: '25px 25px 0px 25px',
      height: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '95%',
      '& > div': {
        marginTop: '10px',
      },
      '& > div:nth-child(1) > p': {
        fontSize: '1.1em',
        fontWeight: 'bold',
      },
      '& > div:nth-child(2) > p': {
        fontWeight: 'normal',
      },
    },
    sortContainer: {
      display: 'flex', 
      justifyContent: 'space-between', 
      width: '95%', 
      marginTop: '15px',
      '& > div': {
        display: 'flex', 
        gap: '5px', 
        alignItems: 'center',
        '& > div:nth-child(2)': {
          display: 'flex',
        },
      },
    },
    tableDiv: {
      width: '95%', 
      marginTop: '15px',
      height: '390px',
    },
    table: {
      '& > tr': {
        height: 'auto !important',
        height: '30px'
      },
    },
    tableHeader: {
      '& > td': {
        fontWeight: 'bold',
        color: '#424242',
      },
      '& > td:nth-child(1)': { //Payment Date
        width: '100px',
      },
      '& > td:nth-child(2)': { //Student Name
        width: '200px',
      },
      '& > td:nth-child(3)': { //Gradelevel
        width: '120px',
      },
      '& > td:nth-child(4)': { //Amount
        width: '100px',
      },
      '& > td:nth-child(5)': { //Actions
        width: '100px',
      },
    },
    tableFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '95%',
      alignItems: 'center',
      borderTop: '1px solid lightgray',
      padding: '10px',
      '& div:nth-child(2) > p': {
        fontSize: '1em',
        fontWeight: 'bold',
        color:'#424242',
      },
      '& > div:nth-child(1):hover': {
        color: 'white',
        backgroundColor: '#228b22',
        borderRadius: '3.5px'
      },
    }, 
    createReport: {
      color: 'white',
      backgroundColor: '#228b22',
      fontSize: '0.75em',
      height: '35px',
    },
    tableLoaderContainer: {
      height: '300px', 
      borderBottom: 'none' 
    },
    emptyListContainer: {
      height: '300px', 
      borderBottom: 'none',
    },
    paymentListRow: {
      '& > td': {
        height: '30px',
        color: '#424242',
        borderBottom: 'none',
        borderTop: '1px solid lightgray',
      },
      '& > td:nth-child(5)': { /////actions
        '& > div': {
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap:'10px', 
          alignItems: 'center',
          '& > div:nth-child(1)': { //// refund button
            width: '80px',
            '& :hover': {
              color: 'white',
              backgroundColor: 'orange',
            },
          }
        },
      },
    },
    dailyTotalSpan: {
      color: '#424242',
      fontWeight: 'normal',
    },
    amountDetails: {
      '& > tr > td': {
        border: 'none',
        padding: '0px',
        color: '#424242',
      },
      '& > tr:last-child > td': {
        paddingBottom: '5px',
        borderBottom: '1.25px solid lightgray',
      },
      '& > tr:nth-child(1) > td': {
        fontWeight: 'bold',
      },
    },
    verifyRefundModal: {
      backgroundColor: 'white',
      borderRadius: '15px',
      margin: '200px auto 10px auto',
      width: '250px',
      padding: '20px',
      '& > div:nth-child(1)': { // text container
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        '& > p': {
          fontWeight: 'bold', 
          fontSize: '0.9em',
        },
      },
      '& > div:nth-child(2)': { // button containers
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '10px',
        '& > div:nth-child(2):hover': {
          color: 'white',
          backgroundColor: '#e6b800',
          borderRadius: '2.5px'
        },
      },
    },
    noButton: {
      color: 'white',
      backgroundColor: '#e6b800',
    },
    refundButton: {
      color: 'white',
      fontSize: '0.75em',
      backgroundColor: 'orange',
      width: '100%',
      height: '35px',
    },
    viewDetailsButton: {
      padding: '0px', 
      minWidth: '10px',
    },
    createReportModal: {
      backgroundColor: 'white',
      height: '195px',
      width: '360px',
      borderRadius: '5px',
      margin: '150px auto 0px auto',
    },
    createReportContent: {
      display: 'flex', 
      flexDirection: 'column', 
      width: '95%', 
      margin: '10px',
    },
    createReportContent1: {
      marginTop: '15px',
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%',
      '& > p': {
        color: '#424242', 
        fontWeight: 'bold', 
        fontSize: '0.85em',
      },
      '& > div': {  // Select schoolyear
        width: '100%',
        height: '40px', 
        padding: '5px',  
      },
    },
    createReportContent2: {
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginTop: '5px',
      '& > div': {
        width: '49%',
        '& > div': {
          width: '100%',
        },
        '& > p': {
          color: '#424242', 
          fontWeight: 'bold', 
          fontSize: '0.85em',
        }
      },
    },
    createReportContent3: {
      marginTop: '10px',
      '& > div': {
        width: '100%',
        '& :hover': {
          backgroundColor: 'orange', 
          color: 'white', 
          borderRadius: '2.5px',
        },
      },
    },
    reportButton: {
      backgroundColor: 'orange', 
      color: 'white', 
      fontSize: '0.75em', 
      width: '100%',
    },
  })
  const classes = styles()
  //////////////////////////    FUNCTIONS    /////////////////////////
  const handleChangeDate = (e) => {
    setPaymentDate(e.target.value)
    getPaymentList(e.target.value)
  }

  const getPaymentList = async(date) => {
    setPayListLoader(true)
    try{
      await fetch("http://localhost:5000/payment/viewPayments", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: state.token,
          schoolyear: state.schoolyear,
          paymentDate: date,
        },
      }).then((res) => res.json()).then((data) => {
        let showFees = []
        for(let i = 0; data.rowCount > i; i++){
          showFees.push(false)
        }
        setFeesCollapse(showFees)
        setPaymentList(data.rows)
        setPayListLoader(false)
      }) 
    }
    catch(error){
      return error
    }
  }

  const showAmountDetails = (e) => {
    let showFees = feesCollapse
    showFees[e.currentTarget.id] = !feesCollapse[e.currentTarget.id]
    setFeesCollapse(showFees)
    setCollapse(!collapse)
  }

  const verifyRefundPay = (e) => {
    setRefundModal(true)
    setNumber(e.currentTarget.id)
  }

  const refund = async() => {
    setRefundLoader(true)
    try{
      await fetch('http://localhost:5000/payment/refundPayment', {
        method: 'DELETE',
        headers: {
          token: state.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schoolyear: state.schoolyear,
          studentID: paymentList[number].student_id,
          paymentID: paymentList[number].payment_id,
          prevBalance: paymentList[number].prev_balance,
          entranceFee: paymentList[number].entrance,
          miscFee: paymentList[number].misc,
          aralinksFee: paymentList[number].aralinks,
          booksFee: paymentList[number].books,
          tuitionFee: paymentList[number].tuition,
        })
      }).then((res) => res.json()).then((data) => {
        setRefundLoader(false)
        setRefundModal(false)
        setNumber(0)
        getPaymentList(paymentDate)
      })
    }
    catch(error){
      return error
    }
  }

  const createReport = () => {
    let payLoad = { userToken : state.token }
    let report = window
    report.open(`http://localhost:3000/report/payment?from=${fromDate}&to=${toDate}&schoolyear=${state.schoolyear}`)
    report.payLoad = payLoad
  }

  const recommendSearch = async(name) => {
    await fetch(`http://localhost:5000/student/recommendSearch`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': state.token,
        'schoolyear': state.schoolyear,
        'name': name
      },
    }).then((res) => res.json()).then((data) => setSearchOptions(data))
  }

  const handleSearch = (e) => {
    recommendSearch(e.target.value)
    setSearchName(e.target.value)
  }

  const search = () => {
    searchPayment(searchName)
  }

  const searchPayment = async(name) => {
    setPayListLoader(true)
    try{
      await fetch(`http://localhost:5000/payment/searchPayment`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          schoolyear: state.schoolyear,
          name: name,
          token: state.token,
        }
      }).then((res) => res.json()).then((data) => {
        setSearchName('')
        setPaymentList(data.rows)
        setPayListLoader(false)
      })
    } 
    catch(error){
      return error
    }
  }

  useEffect(() => {
    getPaymentList(paymentDate)
    recommendSearch(searchName)
  }, [])
  
  //////////////////////////     RENDER      /////////////////////////

  const tableLoader = () => {
    return(
      <TableRow>
        <TableCell align="center" colSpan={5} className={classes.tableLoaderContainer}>
          <CircularProgress size={60} style={{ color: '#3671DC' }}/>
        </TableCell>
      </TableRow>
    )
  }

  const paymentListData = () => {
    if(paymentList.length === 0){
      return(
        <TableRow>
          <TableCell align="center" colSpan={5} className={classes.emptyListContainer}>
              No payment transactions found
          </TableCell>
        </TableRow>
      )
    }
    else{ 
      return paymentList.map((payments, i) => {
        return(
          <React.Fragment>
            <TableRow className={classes.paymentListRow}>
            <TableCell>{payments.payment_id}</TableCell>
            <TableCell>{payments.lastname.toUpperCase().concat(', ', payments.firstname, ' ', payments.middleini)}</TableCell>
            <TableCell>{payments.gradelevel}</TableCell>
            <TableCell>P{payments.amount}</TableCell>
            <TableCell>
              <div>
                <div>
                  <Button id={i} className={classes.refundButton} onClick={(e) => verifyRefundPay(e)}>Refund</Button>
                </div>
                <div>
                  <Button id={i} className={classes.viewDetailsButton} onClick={(e) => showAmountDetails(e)}>
                    {!feesCollapse[i] ? <ExpandMore></ExpandMore> : <ExpandLess></ExpandLess>}
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
          <TableCell colSpan={5} style={{ border: 'none', padding: '0px' }}>
          <Collapse in={feesCollapse[i]} timeout="auto" unmountOnExit>
            <Table className={classes.amountDetails}>
              <TableRow>
                <TableCell>Previous Balance</TableCell>
                <TableCell>Entrance</TableCell>
                <TableCell>Misc</TableCell>
                <TableCell>Aralinks</TableCell>
                <TableCell>Books</TableCell>
                <TableCell>Tuition</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>P{payments.prev_balance}</TableCell>
                  <TableCell>P{payments.entrance}</TableCell>
                  <TableCell>P{payments.misc}</TableCell>
                  <TableCell>P{payments.aralinks}</TableCell>
                  <TableCell>P{payments.books}</TableCell>
                  <TableCell>P{payments.total_tuition}</TableCell>
                </TableRow>
            </Table>
          </Collapse>
          </TableCell>
          </TableRow>
          </React.Fragment>
        )
      })
    }
  }

  const getDailyTotal = () => {
    if(paymentList.length !== 0){
      const amount = paymentList.map((x) => x.amount)
      const dailyTotal = amount.reduce((a, b) => a + b)
      return(
        <React.Fragment><span className={classes.dailyTotalSpan}>P{dailyTotal}</span></React.Fragment>
      )
    }
    else{
      return(
        <React.Fragment><span className={classes.dailyTotalSpan}>P0</span></React.Fragment>
      )
    }
  }

  const verifyRefundModal = () => {
    const lastname = paymentList.length != 0 ? paymentList[number].lastname.toUpperCase() : ''
    return(
      <div className={classes.verifyRefundModal}>
        <div>
          <Typography>Refund payment of {lastname}</Typography>
          <Typography>Continue?</Typography>
        </div>
        <div>
          <div>
            <ActionButton
              text="Yes"
              loader={refundLoader}
              loaderColor="white"
              loaderSize={15}
              color="#F57729"
              onClick={() => refund()}
            />
          </div>
          <div>
            <Button className={classes.noButton} onClick={() => {setRefundModal(false); setNumber(0)}}>No</Button>
          </div>
        </div>
      </div>
    )
  }

  const createReportModal = () => {
    return(
      <div className={classes.createReportModal}>
        <div className={classes.createReportContent}>
          <div className={classes.createReportContent1}>
            <Typography>Schoolyear</Typography>
            <Select 
              variant="outlined" 
              size="small"
              value={state.schoolyear}
              onChange={(e) => setState({...state, schoolyear: e.target.value})}
            >
              <MenuItem value="2020">2020</MenuItem>
            </Select>
          </div>
          <div className={classes.createReportContent2}>
            <div>
              <Typography>From</Typography>
              <TextField 
                variant="outlined" 
                type="date" 
                size="small"
                onChange={(e) => setFromDate(e.target.value)} 
                value={fromDate} 
              />
            </div>
            <div>
              <Typography>To</Typography>
              <TextField 
                variant="outlined" 
                type="date" 
                size="small" 
                onChange={(e) => setToDate(e.target.value)} 
                value={toDate} 
              />
            </div>
          </div>
          <div className={classes.createReportContent3}>
            <div>
              <Button className={classes.reportButton} onClick={() => createReport()}> 
                Create
              </Button>
            </div>
          </div> 
        </div>
        
      </div>
    )
  }
  return(
    <div className={classes.root}>
      <Modal
        open={refundModal}
        onClose={() => {
          setRefundModal(false)
          setNumber(0)
        }}
      >
        {verifyRefundModal()}
      </Modal>
      <Modal
        open={reportModal}
        onClose={() => {
          setReportModal(false)
        }}
      >
        {createReportModal()}
      </Modal>
      <div className={classes.header}>
        <div>
          <Typography>Payments</Typography>
        </div>
        <div>
          <Typography>SY 2020-2021</Typography>
        </div>
      </div>
      <div className={classes.sortContainer}>
        <div>
          <div>
            <TextField
              type="date"
              variant="outlined"
              value={paymentDate}
              size="small"
              style={{ width: '200px' }}
              onChange={(e) => handleChangeDate(e)}
            />
          </div>
        </div>
        <div>
          <div>
          <AutoComplete 
            freeSolo
            options={searchOptions.map((x) => x.studentname)}
            style={{ width: '350px' }}
            renderInput={(params) => {
              return(
                <TextField 
                  {...params} 
                  name="name"
                  label="Search Student" 
                  size="small" 
                  variant="outlined"
                  onBlur={(e) => setSearchName(e.target.value)}
                  onChange={debounce((e) => handleSearch(e), 1000)}
                />
              )
            }}
          />
          </div>
          <div>
            <Button onClick={search}>
              <SearchIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.tableDiv}>
      <Scrollbars style={{ height: '100%' }}>
        <TableContainer>
          <Table className={classes.table}>
            <TableRow className={classes.tableHeader}>
              <TableCell>Payment ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Gradelevel</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
            <TableBody>
              {paymentListLoader ? tableLoader() : paymentListData()}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbars>
      </div>
      <div className={classes.tableFooter}>
        <div>
          <Button className={classes.createReport} onClick={() => setReportModal(true)}>Create Report</Button>
        </div>
        <div>
          <Typography>Total: {getDailyTotal()}</Typography>
        </div>
      </div>
    </div>
  )
}
export default Payment