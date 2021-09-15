import React, { Fragment, useEffect, useState } from 'react'
import AutoComplete from '@material-ui/lab/Autocomplete'
import Select from '@material-ui/core/Select'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'
import Chip from '@material-ui/core/Chip'
import SearchIcon from '@material-ui/icons/Search'
import MenuItem from '@material-ui/core/MenuItem'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import TablePagination from '@material-ui/core/TablePagination'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Collapse from '@material-ui/core/Collapse'
import SnackBar from '@material-ui/core/Snackbar'
import ActionButton from '../components/utils/button'
import Response from '../components/utils/response'
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core'
import { Scrollbars } from 'react-custom-scrollbars'
import debounce from 'lodash/debounce'

//if variable uses underscores, it is data from the back end
//props in this component is the student_account data 
const StudentAccount = () => {
  const tuitionFee = ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May' ]
  const [state, setState] =  useState({
    schoolyear: 2020,
    token: sessionStorage.getItem('userToken'),
  })
  const [receipt, setReceipt] = useState({
    snackbar: false,
    payFeesArray: [],
    payTuitionArray: [],
    studentID: '',
    studentName: '',
    gradeLevel: '',
  })
  const [sort, setSort] = useState({ gradelevel: 'Grade 1', name: '' })
  const [reportParams, setReportParams] = useState({ schoolyear: state.schoolyear, gradelevel: 'Grade 1' })
  const [payment, setPayment] = useState('')
  const [reportModal, setReportModal] = useState('')
  const [verifySibling, setVerifySibling] = useState(false)
  const [tableLoader, setTableLoader] = useState(false)
  const [clearDiscountLoader, setClearDiscountLoader] = useState(false)
  const [updateDiscountLoader, setUpdateDiscountLoader] = useState(false)
  const [initialPayLoader, setInitPayLoader] = useState(false)
  const [payLoader, setPayLoader] = useState(false)
  const [payModal, setPayModal] = useState(false)
  const [updateFeesModal, setUpdateFeesModal] = useState(false)
  const [showTuition, setShowTuition] = useState(false)
  const [honorDiscount, setHonorDiscount] = useState({ honors: 'None' })
  const [famDiscount, setFamDiscount] = useState({ siblings: [] })
  const [payResponse, setPayResponse] = useState('')
  const [updateResponse, setUpdateResponse] = useState('')
  const [adopted, setAdopted] = useState('')
  const [searchOptions, setOptions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [page, setPage] = useState(0)
  const [number, setNumber] = useState(0)
  
  const styles = makeStyles({
    root: {
      backgroundColor: 'white',
      margin: '25px 25px 0px 25px',
      height: '95%',
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
      marginTop: '15px',
      width: '95%',
      display: 'flex',
      justifyContent: 'space-between',
      '& > div': {
        display: 'flex',
      }
    },
    tableContainer: {
      marginTop: '15px',
      width: '95%',
    },
    table: {
      width: '100%',
      height: '90%',
      '& > table > tr:nth-last-child(1) > td': {
        borderBottom: 'none'
      },
    },
    tableHeader: {
      '& > td': {
        height: '20px',
        '& > p': {
          fontSize: '1em',
          color: '#424242',
          fontWeight: 'bold',
        },
      }
    },
    tableContent: { // account list rows  
      '& > td': {
        height: '30px',
        color: '#424242'
      },
      // '& > td:nth-child(1)': {
      //   width: '30px',
      // },
      '& > td:nth-child(2)': {
        width: '300px',
      },
      // '& > td:nth-child(3)': {
      //   width: '50px',
      // },
      // '& > td:nth-child(4)': {
      //   width: '50px'
      // },
      '& > td:nth-child(5)':{ //discounts column
        width: '40%',
        '& > div': {
          backgroundColor: 'gray',
          color: 'white',
          borderRadius: '5px',
          padding: '8px',
          fontSize: '0.85em',
          margin: '0px 5px 0px 5px',
          display: 'inline',
        }
      },
      '& > td:nth-child(6)':{ //actions column
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        '& > div:nth-child(1):hover': {
          color: 'white',
          backgroundColor: '#F57729',
          height: '35px',
          borderRadius: '2.5px',
        },
        '& > div:nth-child(2):hover': {
          color: 'white',
          backgroundColor: '#e6b800',
          height: '35px',
          borderRadius: '2.5px',
        },
      },
    },
    payFees: { 
      color: 'white',
      backgroundColor: '#F57729', //redorange
      fontSize: '0.85em',
      height: '35px',
      '& :hover': {
        color: 'white',
      },
    },
    updateFees: {
      color: 'white',
      backgroundColor: '#e6b800', //yellow
      fontSize: '0.85em',
      height: '35px',
      '& :hover': {
        color: 'white',
      },
    },
    footerContainer: {
      width: '100%',
      marginTop: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > div:nth-child(1):hover': {
        color: 'white',
        backgroundColor: '#228b22',
        borderRadius: '5px',
        height: '35px',
      },
    },
    pagination: {
      fontWeight: 'bold',
      '& > div': {
        fontWeight: 'bold',
      },
      '& > td': {
        border: 'none',
        '& > p': {
          fontWeight: 'bold',
        },
      },
    },
    createReport: {
      color: 'white',
      backgroundColor: '#228b22',
      fontSize: '0.75em',
      height: '35px',
    },
    createReportModal: {
      backgroundColor: 'white',
      height: '185px',
      width: '360px',
      borderRadius: '5px',
      margin: '150px auto 0px auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
      '& > div': {
        width: '95%',
        '& > p': {
          color: '#424242',
          fontSize: '0.85em',
          fontWeight: 'bold',
        },
      },
      '& > div:nth-child(1)': {
        marginTop: '10px'
      },
      '& > div:nth-child(3)': {
        marginTop: '5px',
      },
    },
    createReportButton: {
      backgroundColor: 'orange', 
      color: 'white', 
      fontSize: '0.75em', 
      width: '100%', 
    },
    ///////////////////////// PAYMENT MODAL /////////////////////////////////
    paymentModalContainer: {
      margin: '0px 300px 10px 500px', 
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
    },
    paymentHeader: {
      margin : '5px 15px 0px 30px',
      display: 'flex',
      flexDirection: 'column',
      '& > div': {
        borderBottom: '1px solid lightgray', 
        display: 'flex',
        justifyContent: 'space-between',
        '& > h5': {
          fontWeight: 'bold'
        },
      },
    },
    closeButton: {
      backgroundColor: 'red', 
      minWidth:'10px', 
      height: '25px',
      color: 'white',
    },
    feesContainer: {
      // border: '1px solid red',
      margin : '15px 15px 0px 15px',
    },
    studentInfo: {
      margin: '0px 15px 0px 15px', 
      display: 'flex', 
      flexDirection: 'column',
      '& > div': {
        display: 'flex', 
        justifyContent: 'space-between',
        '& > p': {
          color: '#424242',
        },
        '& > p:nth-child(2)': {
          fontWeight: 'bold'
        }
      }
    },
    feesContentTableContainer: { 
      marginTop: '20px', 
      boxShadow: '2.5px 2.5px 5px 2.5px lightgray',
      '& > table > tr:nth-child(1) > td': { //table header 
        fontWeight: 'bold'
      },
      '& > table > tr:nth-child(n + 2) > td:nth-child(1)': { 
        color: '#424242',
      },
      '& > table > tr:nth-child(6) > td:nth-child(1)': { // tuition rows
        display: 'flex'
      },   
    },
    tuitionDetails: {
      paddingBottom: '5px', 
      paddingTop: '5px', 
      border: 'none',
    },
    tuitionDetailsInfo: {
      width: '100%',
      display:'flex', 
      flexDirection: 'column', 
      flexWrap: 'wrap', 
      height: '120px',
      '& > div': {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', 
        textAlign: 'center',
        '& > p:nth-child(1)': {
          fontSize: '1em',
          color: '#424242',
        },
        '& > p:nth-child(2)': {
          fontSize: '1em',
          color: 'black',
        },
      },
      '& > div:nth-child(10)':{ //discounts in tuition detail
        border: '1px solid lightgray',
        '& > p': {
          fontSize:'1em', 
          color: 'black', 
          fontWeight: 'bold'
        }
      }
    },
    totalBalance: {
      '& > p': {
        fontWeight: 'bold',
        color: '#424242',
        fontSize: '1.2em',
      }    
    },
    payContainer: {
      margin: '20px 0px 10px 0px',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-end',
      '& > div:nth-child(1)': {
        display: 'flex' , 
        width: '50%', 
        flexDirection: 'column',
        '& > p': {
          fontSize: '1em',
          fontWeight: 'bold',
          color: 'black',
        },
        '& > input': {
          width: '30%',
        }
      },
      '& > div:nth-child(3)': {
        display: 'flex',
        gap: '10px',
      },
    },
    ////////////////////   RECEIPT SNACKBAR       ////////////////////////
    receiptContainer : {
      borderRadius: '15px',
      width: '500px',
      backgroundColor: 'white',
      boxShadow: '2.5px 2.5px 5px 2.5px gray',
    },
    receiptContent: {
      width: '90%',
      margin: '20px auto 20px auto',
      '& > div:nth-child(1) > p': {
        fontSize: '1.1em', 
        fontWeight: 'bold', 
        color: '#424242'
      },
      '& > div:nth-child(2)': {
        marginTop: '20px', 
        color: '#424242'
      }
    },
    receiptTableInfo: {
      border: '1px solid lightgray',
      '& > tr:nth-child(1) > td': {
        padding: '5px', 
        fontSize: '0.8em', 
        borderBottom: 'none',
      },
      '& > tr:nth-child(2) > td': {
        color: 'black', 
        fontWeight: 'bold' 
      },
    },
    receiptTableFees: {
      marginTop: '20px',
      '& > tr:nth-child(1)': { //table header
        '& > td:nth-child(1)': {
          padding: '20px', 
          borderBottom:'none', 
          backgroundColor: '#f2f2f2', 
          color: '#424242', 
          fontWeight: 'bold',
        },
        '& > td:nth-child(2)': {
          borderBottom:'none', 
          backgroundColor: '#f2f2f2', 
          color: '#424242', 
          fontWeight: 'bold'
        },
      },
      '& > tr:nth-child(2)': {
        '& > td:nth-child(1)': {
          borderBottom:'none', 
          color: '#424242',
          padding: '10px',
        },
        '& > td:nth-child(2)': {
          borderBottom:'none', 
          padding: '10px',
        },
      }
    },
    receiptFooter: {
      '& > td:nth-child(1)': {
        height: '10%',
        borderBottom: 'none',
      },
      '& > td:nth-child(2)': {
        color: '#424242',
        height: '10%', 
        padding: '10px', 
        fontSize:'0.9em', 
        borderTop: '1px solid lightgray', 
        fontWeight: 'bold',
        borderBottom: 'none',
      }
    },
    ////////////////////////////    UPDATE MODAL         ////////////////////////////
    updateModal: {
      backgroundColor: 'white',
      width: '550px',
      border: '1px solid white',
      margin: '100px auto 100px auto'
    },
    updateModalContent: {
      width: '95%',
      height: '90%',
      margin: '10px auto 15px auto',
    },
    updateModalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid lightgray',
      marginTop: '5px',
      '& > h5': {
        fontWeight: 'bold'
      }
    },
    updateModalInfo: {
      marginTop: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      '& > div:nth-child(1) > p': {
        color: '#424242'
      },
      '& > div:nth-child(2) > p': {
        color: '#424242',
        fontWeight: 'bold'
      },
    },
    updateModalDiscounts: {
      marginTop: '15px',
       '& > div:nth-child(-n + 2) > p': {
         fontSize: '0.95em',
       },
    },
    updateModalInput: {
      width: '100%',
      height: '40px',
    },
    updateModalTags: {
      marginTop: '15px',
      display: 'flex', 
      justifyContent: 'flex-end',
      '& div': {
        display: 'flex',
        gap: '5px', 
        alignItems: 'center',
        '& > div:nth-child(1) > p': {
          fontSize: '0.95em', 
          color: 'black',
        }
      },
      '& > div > div:nth-child(2)': { //chips discount tags
        display:'flex', 
        flexFlow:'wrap', 
        gap: '5px',
      },
    },
    updateModalFooter: {
      marginTop: '15px', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'flex-end',
      '& > div:nth-child(2)': { //button containers
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        '& > div': {
          width: '20%',
        }
      },
    },
    //////////////      VERIFY SIBLING        ///////////////////
    verifySiblingModal: {
      backgroundColor: 'white',
      borderRadius: '15px',
      margin: '200px auto 10px auto',
      width: '350px',
    },

    verifySiblingContainer: {
      padding: '20px 10px 20px 10px' , 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      '& > div:nth-child(1)': {
        display: 'flex', 
        flexDirection:'column', 
        alignItems:'center',
        justifyContent: 'center',
        '& > p': {
          fontSize: '0.9em', 
          fontWeight: 'bold',
        }
      },
      '& > div:nth-child(2)': {
        display: 'flex', 
        marginTop: '10px',
        width: '45%',
        justifyContent: 'space-between',
        '& > div:nth-child(1) :hover': {
          height: '35px',
          borderRadius: '2.5px',
          color: 'white',
          backgroundColor: '#F57729',
        },
        '& > div:nth-child(2) :hover': {
          height: '35px',
          borderRadius: '2.5px',
          color: 'white',
          backgroundColor: '#e6b800',
        },
      }
    },
  })
  const classes = styles()

  ////////////////           FUNCTIONS           //////////////////////
  const handlePayAmount = (e) => {
    setPayment(e.target.value)
    setPayResponse('')
  }
  
  const payAccount = async() => {
    setPayLoader(true)
    await fetch('http://localhost:5000/account/payStudentAccount', {
      method: 'POST',
      headers: {
        'token': state.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        schoolyear: state.schoolyear,
        studentID: accounts[number].student_id,
        payAmount: payment
      })
    }).then((res) => res.json()).then((data) => {
      if(data.status == 200){
        setPayModal(false)
        getAccounts(sort.gradelevel)
        setReceipt({
          ...receipt, 
          snackbar: true,
          payFeesArray: data.payFeesArray, 
          payTuitionArray: data.payTuitionArray,
          studentID: accounts[number].student_id,
          studentName: 
          accounts[number].lastname.toUpperCase().concat(', ', accounts[number].firstname + ' ' + accounts[number].middleini),
          gradeLevel: accounts[number].gradelevel
        })
      }
      else if(data.status >= 400){
        setPayResponse(data.message)
        setPayment('')
      }
      setPayLoader(false)
    })
  }

  const payInitialDown = async() => {
    setInitPayLoader(true)
    let fees = [
      accounts[number].entrance, 
      accounts[number].misc, 
      accounts[number].aralinks, 
      accounts[number].books
    ]
   
    await fetch(`http://localhost:5000/account/payInitial/${accounts[number].student_id}`, {
      method: 'PUT',
      headers: {
        'token': state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        schoolyear: state.schoolyear,
        fees: fees
      })
    }).then((res) => res.json()).then((data) => {
      if(data.status >= 400){
        setPayResponse(data.message)
        setInitPayLoader(false)
      }
      else if(data.status == 200){
        setPayModal(false)
        setInitPayLoader(false)
        setPayResponse('')
        setNumber(0)
        getAccounts(sort.gradelevel)
        setReceipt({
          ...receipt, 
          snackbar: true,
          payFeesArray: data.fees, 
          studentID: accounts[number].student_id,
          studentName: 
          accounts[number].lastname.toUpperCase().concat(', ', accounts[number].firstname + ' ' + accounts[number].middleini),
          gradeLevel: accounts[number].gradelevel
        })
      }   
    })
  }

  const openPayment = (e) => {
    setNumber(((page) * 5) + parseInt(e.currentTarget.id))
    setPayModal(true)
  }

  const openUpdate = (e) => {
    setNumber(((page) * 5) + parseInt(e.currentTarget.id))
    setUpdateFeesModal(true) 
  }
  
  const closePayment = () => {
    setPayModal(false)
    setNumber(0)
    setShowTuition(false)
    setPayment('')
    setPayResponse('')
  }
 
  const handleSearch = (e) => {
    recommendSearch(e.target.value)
    setSort({...sort, name: e.target.value})
  }

  const search = () => {
    searchAccount(sort.name)
    setPage(0)
  }

  const searchAccount = async(name) => {
    setTableLoader(true)
    await fetch('http://localhost:5000/account/searchAccount', {
      headers: {
        'Content-Type': 'application/json',
        'name': name,
        'schoolyear': state.schoolyear,
        'token': state.token,
      },
    }).then((res) => res.json()).then((data) => {
      setAccounts(data.rows)
      setTableLoader(false)
      setSort({...sort, name: ''})
    })
  }

  const recommendSearch = async(name) => {
    await fetch('http://localhost:5000/student/recommendSearch', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'name': name,
        'token': state.token,
        'schoolyear': state.schoolyear
      }
    }).then((res) => res.json()).then((data) => setOptions(data))
  }
  
  const getAccounts = async(gradeLevel) => {
    setTableLoader(true)
    await fetch('http://localhost:5000/account/viewStudentAccounts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: state.token,
          schoolyear: state.schoolyear,
          gradelevel: gradeLevel,
        },
      }).then((res) => res.json()).then((data) => {
        setAccounts(data.rows)
        setPage(0)
        setTableLoader(false)
      })
  }
 
  const selectGrade = (e) => {
    setSort({...sort, gradelevel: e.target.value})
    getAccounts(e.target.value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleDiscountTags = (e) => {
    let siblings = famDiscount.siblings
    const name = accounts[number].firstname.concat(' ', accounts[number].lastname)
    const lastname = e.target.value.match(/\b(\w+)\W*$/) //gets last name of e.target.value
    let doubleName = siblings.includes(e.target.value)  //checks if tags are doubled 
    
    if(e.target.value !== "" && e.target.value != name && doubleName == false){
      if(lastname[0] != accounts[number].lastname){
        setVerifySibling(true)
        setAdopted(e.target.value)
      }
      else{
        siblings.push(e.target.value)
        setFamDiscount({siblings: siblings})
      }
    }
  }
    
  const updateDiscount = async() => {
    setUpdateResponse('')
    setUpdateDiscountLoader(true) 
    
    await fetch(`http://localhost:5000/account/updateDiscount/${accounts[number].student_id}`, {
    method: 'PUT',
    headers: {
      token: state.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      honorDiscount: honorDiscount.honors,
      famDiscount: famDiscount.siblings,
      schoolyear: state.schoolyear
      })
    }).then((res) => res.json()).then((data) => {
      if(data.status >= 400){
        setUpdateResponse(data.message)
        setUpdateDiscountLoader(false)
      }
      else if(data.status == 200){
        setUpdateDiscountLoader(false)
        setUpdateFeesModal(false)
        setHonorDiscount({honors: 'None'})
        setUpdateResponse('')
        setFamDiscount({siblings: []})
        getAccounts(sort.gradelevel)
      }
    })
  }

  const clearDiscount = async() => {
    setClearDiscountLoader(true)
    await fetch(`http://localhost:5000/account/clearDiscount/${accounts[number].student_id}`, {
      method: 'PUT',
      headers: {
        token: state.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        schoolyear: state.schoolyear
      }),
    }).then((res) => res.json()).then((data) => {
      if(data.status >= 400){
        setUpdateResponse(data.message)
        setClearDiscountLoader(false)
      }
      else{
        setUpdateFeesModal(false)
        setClearDiscountLoader(false)
        setHonorDiscount({honors: 'None'})
        setUpdateResponse('')
        setFamDiscount({siblings: []})
        getAccounts(sort.gradelevel)
      }
    })
  }

  const createReport = () => {
    let payLoad = { userToken: state.token, gradeLevel: reportParams.gradelevel, schoolyear: reportParams.schoolyear }
    let report = window
    report.open(`http://localhost:3000/report/account`)
    report.payLoad = payLoad
  }

  useEffect(() => {
    getAccounts(sort.gradelevel)
    recommendSearch(sort.name)
  }, [])

  /////////////////////////    RENDER     ////////////////////////
  
  const accountList = () => {
    let rows = accounts /// studentaccounts rows list
    accounts.length < 5 /// this is a function to only show 5 rows per page
    ?  rows = accounts.slice(page, accounts.length) 
    : rows = accounts.slice(page * 10 , (page + 1) * 10)
 
    return rows.map((account, i) => {
      return(
        <Fragment>
          <TableRow className={classes.tableContent}>
          <TableCell>
            {account.student_id}
          </TableCell>
          <TableCell>
            {account.lastname.toUpperCase().concat(', ', account.firstname + ' ' + account.middleini)}
          </TableCell>
          <TableCell>
            {account.gradelevel}
          </TableCell>
          <TableCell align="right">
            {account.total_balance}
          </TableCell>
          <TableCell align="center">
            {account.discounts.map((x) => <div>{x}</div>)}
          </TableCell> 
          <TableCell align="right">
            <div>
              <Button 
                id={i}
                className={classes.payFees}
                onClick={(e) => openPayment(e)}
              >
                <span id={i} onClick={(e) => openPayment(e)}>Pay</span>
              </Button> 
            </div>
            <div>
              <Button 
                id={i}
                className={classes.updateFees}
                onClick={(e) => openUpdate(e)}
              >
                <span id={i} onClick={(e) => openUpdate(e)}>Update</span>
              </Button>
            </div>
          </TableCell>
          </TableRow>
        </Fragment>
      )
    }) 
  }

  const accountListLoader = () => {
    return(
      <TableRow>
        <TableCell colSpan={6} align="center" style={{ height: '300px',  border: 'none' }}>
        <CircularProgress size={60} style={{ color: '#3671DC' }}/>
        </TableCell>
      </TableRow>
    )
  }
  
  const paymentModal = () => {
    let account = []
    accounts.length == 0 
    ? account = [{
        student_id: '',
        firstname: '',
        middleini: '',
        lastname: '',
        gradelevel: '',
        entrance: '',
        misc: '',
        aralinks: '',
        books: '',
        tuition: [0 ,0 ,0 ,0, 0, 0, 0 ,0 , 0 ],
        total_balance: '',
        discounts: [''],
    }]
    : account = accounts

    const tuitionDetails = tuitionFee.map((x, i) => {
      let tuitionAmount = []
      accounts.length == 0 ? tuitionAmount = [0 ,0, 0, 0, 0, 0, 0, 0, 0] : tuitionAmount = accounts[number].tuition
      return(
        <div>
          <Typography>{x}</Typography>
          <Typography>P{tuitionAmount[i]}</Typography>
        </div>
      )
    })

    return(
        <Scrollbars style={{height: '100%', marginTop: '10px'}}>
          <div className={classes.paymentModalContainer}>    
            <div className={classes.paymentHeader}>
              <div>
                <Typography variant="h5">Payment</Typography>
                <Button className={classes.closeButton} onClick={closePayment}>
                  <CloseIcon />
                </Button>
              </div>
            </div>
            <div className={classes.feesContainer}>
              <div className={classes.studentInfo}>
                <div>
                  <Typography>Student ID</Typography>
                  <Typography>{account[number].student_id}</Typography>
                </div>
                <div>
                  <Typography>Student Name</Typography>
                  <Typography>
                    {account[number].lastname.toUpperCase().concat(', ', account[number].firstname + ' ' + account[number].middleini)}
                  </Typography>
                </div>
                <div>
                  <Typography>Gradelevel</Typography>
                  <Typography>{account[number].gradelevel}</Typography>
                </div>
              </div>
              <TableContainer className={classes.feesContentTableContainer}>
                <Table>
                  <TableRow>
                    <TableCell>Fees</TableCell>
                    <TableCell align="center">Amount</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Entrance</TableCell>
                    <TableCell align="center">P{account[number].entrance}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Misc</TableCell>
                    <TableCell align="center">P{account[number].misc}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Aralinks</TableCell>
                    <TableCell align="center">P{account[number].aralinks}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Books</TableCell>
                    <TableCell align="center">P{account[number].books}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ display: 'flex'}}>
                      <Button 
                        style={{ padding: '0px', minWidth: '10px' }} 
                        onClick={() => setShowTuition(!showTuition) 
                      }>
                        {!showTuition ? <ExpandMore /> : <ExpandLess />}
                      </Button>
                      Tuition
                    </TableCell>
                    <TableCell align="center">P{account[number].tuition.reduce((a, b) => a + b)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className={classes.tuitionDetails}>
                      <Collapse in={showTuition} timeout="auto" unmountOnExit> 
                      <div className={classes.tuitionDetailsInfo}>
                        {tuitionDetails}
                        <div>
                        <Typography>Discounts: </Typography>
                        <Typography>{account[number].discounts[0]} </Typography>
                        </div>
                      </div> 
                      </Collapse>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Previous Balance</TableCell>
                    <TableCell align="center">P{account[number].prev_balance}</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell colSpan={2} align="right" className={classes.totalBalance}>
                      <Typography>Total Balance: P{account[number].total_balance}</Typography>
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
              <div className={classes.payContainer}>
                <div> 
                  <Typography>Amount:</Typography>
                  <TextField 
                    size="small" 
                    variant="outlined" 
                    name="amount"
                    onBlur={(e) => handlePayAmount(e)}
                  />
                </div>
                <div>
                  <Response message={payResponse} margin={"5px"}/>
                </div>
                <div>
                  <div>
                    <ActionButton 
                      loader={initialPayLoader} 
                      id={number}
                      loaderSize={15}
                      loaderColor="white" 
                      color="orange" 
                      text="Initial Down" 
                      onClick={payInitialDown}
                    />
                  </div>
                  <div>
                    <ActionButton 
                      loader={payLoader} 
                      id={number}
                      loaderSize={15}
                      loaderColor="white" 
                      color="#F57729" 
                      text="Pay Fees" 
                      onClick={payAccount}
                    />
                  </div>
                
                </div>
              </div>
            </div>
          </div>
      </Scrollbars>
    )
  }

  const receiptSnackbar = () => {
    const feesName = ['Previous Balance', 'Entrance', 'Misc', 'Aralinks', 'Books']
    let tuitionMonth = []
    let feesAmount = []
    let tuitionAmount = []
    let receiptInfo = {
      studentID: receipt.studentID === "" ? '' : receipt.studentID,
      studentName: receipt.studentName=== "" ? '' : receipt.studentName,
      gradeLevel: receipt.gradeLevel === "" ? '' : receipt.gradeLevel,
    }
    let date = new Date(Date.now());
    let paymentDate = date.toString().substr(3, 12)
    

    receipt.payFeesArray.length === 0 
    ? feesAmount = [0, 0, 0, 0, 0, 0] : feesAmount = receipt.payFeesArray
    receipt.payTuitionArray.length === 0 
    ? tuitionAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0] : tuitionAmount = receipt.payTuitionArray

    const tuition = tuitionAmount.map((x, i) => {
      if(x != 0){
        tuitionMonth.push(tuitionFee[i].slice(0, 3)) 
        return x
      }
      else if(x == 0){
        return 0
      }
    })
 
    const fees = feesAmount.map((x, i) => {
      if(x != 0){
        return(
          <TableRow>
            <TableCell align="left">{feesName[i]}</TableCell>
            <TableCell align="center">{x}</TableCell>
          </TableRow>
        )
      }
    })
    let totalAmount = feesAmount.reduce((a, b) => a + b) + tuitionAmount.reduce((a, b) => a + b)
    
    //render of receipt
    return(
      <div className={classes.receiptContainer}>
      <div className={classes.receiptContent}>
        <div>
          <Typography>Payment Successful</Typography>
        </div>
        <div>
          <Table className={classes.receiptTableInfo}>
            <TableRow>
              <TableCell align="center">Student ID</TableCell>
              <TableCell align="center">Student Name</TableCell>
              <TableCell align="center">Gradelevel</TableCell>
              <TableCell align="center">Payment Date</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{receiptInfo.studentID}</TableCell>
              <TableCell align="center">{receiptInfo.studentName}</TableCell>
              <TableCell align="center">{receiptInfo.gradeLevel}</TableCell>
              <TableCell align="center">{paymentDate}</TableCell>
            </TableRow>
          </Table>
        </div>
        <Table className={classes.receiptTableFees}> 
          <TableRow>
            <TableCell align="left">Fees</TableCell>
            <TableCell align="center">Amount</TableCell>
          </TableRow>
            {fees}
          <TableRow>
            <TableCell>
              {
              tuitionMonth.length == 0 ? 
              tuitionMonth == [] :
                tuitionMonth.length == 1 ?
                tuitionMonth[0] : 
                tuitionMonth[0].concat('-', tuitionMonth[tuitionMonth.length - 1])
              }
            </TableCell>
            <TableCell align="center">{tuition.filter(x => x != 0).join(',')}</TableCell>
          </TableRow>
          <TableRow className={classes.receiptFooter}>
            <TableCell></TableCell>
            <TableCell align="center">
              Total: {totalAmount}
            </TableCell>
          </TableRow>
        </Table>
        </div>
    </div>
    )
  }
  
  const updateDiscountModal = () => {
    let account = []
    accounts.length === 0 
    ? account = [{
        student_id: '',
        firstname: '',
        middleini: '',
        lastname: '',
        gradelevel: '',
    }]
    : account = accounts

    const honorDiscountChips = honorDiscount.honors == "" ? "" : honorDiscount.honors
    const family = famDiscount.siblings.length == 0 ? [] : famDiscount.siblings
    
    const renderHonorChips = () => {
      return(
        <div>
          <Chip label={`Honors: ${honorDiscountChips}`} />
        </div>
      )
    }
    const renderFamChips = () => family.map((x, i) => {
      return(
        <div>
          <Chip label={x} id={i} onDelete={() => {
            family.splice(i - 0, 1)
            setFamDiscount({siblings: family})
          }}/>
        </div>
      )
    })
    
    return(
      <div className={classes.updateModal}>
        <div className={classes.updateModalContent}>
          <div className={classes.updateModalHeader}>
            <Typography variant="h5">Update Discounts</Typography>
            <Button 
              loader={payLoader} 
              id={number}
              loaderSize={15}
              loaderColor="white" 
              color="#F57729" 
              text="Pay" 
              className={classes.closeButton} 
              onClick={() => {
                setUpdateFeesModal(false)
                setHonorDiscount({honors: 'None'})
                setFamDiscount({siblings: []})
                setNumber(0)
                setUpdateResponse('')
              }}
            >
              <CloseIcon />
            </Button>
          </div>
          <div className={classes.updateModalInfo}>
            <div>
              <Typography>Student ID</Typography>
              <Typography>Student Name</Typography>
              <Typography>Gradelevel</Typography>
            </div>
            <div>
              <Typography>{account[number].student_id}</Typography>
              <Typography> {account[number].lastname.toUpperCase().concat(', ', account[number].firstname + ' ' + account[number].middleini)}</Typography>
              <Typography>{account[number].gradelevel}</Typography>
            </div>
          </div>
          <div className={classes.updateModalDiscounts}>
            <div>
              <Typography>Honors</Typography>
              <Select
                className={classes.updateModalInput}
                variant="outlined"
                value={honorDiscount.honors}
                name="honors"
                onChange={(e) => {
                  setHonorDiscount({honors: e.target.value})
                }}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="With Honors">With Honors</MenuItem>
                <MenuItem value="With High Honors">With High Honors</MenuItem>
                <MenuItem value="With Highest Honors">With Highest Honors</MenuItem>
              </Select>
            </div>
            <div>
              <Typography>Siblings</Typography>
              <AutoComplete 
                freeSolo
                options={searchOptions.map((x) => x.studentname)}
                renderInput={(params) => {
                return(
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    name="siblings"
                    className={classes.updateModalInput}
                    onBlur={(e) => handleDiscountTags(e)}
                    onChange={debounce((e) => handleSearch(e), 1000)}
                    onKeyPress={(e) => e.key === "Enter" ? handleDiscountTags(e) : ""}
                  />
                )        
              }}
              />
            </div>
            <div className={classes.updateModalTags}>
              <div>
                <div>
                  <Typography>Discount Tags:</Typography>
                </div>
                <div>
                  {renderHonorChips()}
                  {renderFamChips()}
                </div>
              </div>
            </div>
            <div className={classes.updateModalFooter}>
              <div>
                <Response message={updateResponse} margin="5px"/>
              </div>
              <div>
                <div>
                  <ActionButton 
                    text="Remove" 
                    color="#F57729"
                    loader={clearDiscountLoader} 
                    loaderSize={15}
                    loaderColor="white" 
                    onClick={clearDiscount}
                  />
                </div>
                <div>
                  <ActionButton 
                    text="Update" 
                    color="orange"
                    loader={updateDiscountLoader} 
                    loaderSize={15}
                    loaderColor="white" 
                    onClick={updateDiscount}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const verifySiblingModal = () => {
    return(
      <div className={classes.verifySiblingModal}>
        <div className={classes.verifySiblingContainer}>
          <div> 
            <Typography>Sibling has a different lastname.</Typography>
            <Typography>Proceed?</Typography>
          </div>
          <div>
            <div>
              <Button 
                className={classes.payFees} 
                size="small" 
                onClick={() => {
                  let siblings = famDiscount.siblings
                  siblings.push(adopted)
                  setFamDiscount({siblings: siblings})
                  setVerifySibling(false)
              }}>
                Yes
              </Button>
            </div>
            <div>
            <Button 
              className={classes.updateFees} 
              onClick={() => {
                setAdopted('')
                setVerifySibling(false)
              }}>
              No
            </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const createReportModal = () => {
    return(
      <div className={classes.createReportModal}>
        <div>
          <Typography>Schoolyear</Typography>
          <Select variant="outlined" value={reportParams.schoolyear} style={{ height: '35px', width: '100%' }}>
            <MenuItem value="2020">2020</MenuItem>
          </Select>
        </div>
        <div>
          <Typography>Gradelevel</Typography>
          <Select 
            variant="outlined" 
            value={reportParams.gradelevel} 
            style={{ height: '35px', width: '100%' }}
            onChange={(e) => setReportParams({...reportParams, gradelevel: e.target.value})}
          >
            <MenuItem value="Grade 1">Grade 1</MenuItem>
            <MenuItem value="Grade 2">Grade 2</MenuItem>
            <MenuItem value="Grade 3">Grade 3</MenuItem>
          </Select>
        </div>
        <div>
          <Button className={classes.createReportButton} onClick={() => createReport()}>Create</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <SnackBar
        open={receipt.snackbar}
        onClose={() => {
          setNumber(0)
          setReceipt({
            ...receipt, 
            snackbar: false, 
            payFeesArray: [], 
            payTuitionArray: [],
            studentName: '',
            studentID: '',
            gradeLevel: ''
          })
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
       {receiptSnackbar()}
      </SnackBar>
      <Modal
        open={verifySibling}
        onClose={() => {
          setVerifySibling(false)
        }}
      >
        {verifySiblingModal()}
      </Modal>
      <Modal
        open={payModal}
        onClose={() => {
          setNumber(0)
          setPayModal(false)
          setPayResponse('')
          setShowTuition(false)
          setPayment('')
        }}
      >
        {paymentModal()}
      </Modal>
      <Modal
        open={updateFeesModal}
        onClose={() => {
          setNumber(0)
          setUpdateFeesModal(false)
          setHonorDiscount({honors: 'None'})
          setUpdateResponse('')
          setFamDiscount({siblings: []})
        }}
      >
        {updateDiscountModal()}
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
          <Typography>Student Account</Typography>
        </div>
        <div>
          <Typography>SY 2020-2021</Typography>
        </div>
      </div>
   
      <div className={classes.sortContainer}>
        <div>
          <Select 
            style={{ height: '40px' }}
            name="gradelevel"
            value={sort.gradelevel} 
            variant="outlined" 
            onChange={selectGrade}
          >
            <MenuItem value="Grade 1">Grade 1</MenuItem>
            <MenuItem value="Grade 2">Grade 2</MenuItem>
            <MenuItem value="Grade 3">Grade 3</MenuItem>
          </Select>
        </div>
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
                  onBlur={(e) => setSort({...sort, name: e.target.value})}
                  onChange={debounce((e) => handleSearch(e), 1000)}
                />
              )
            }}
          />
          <Button onClick={() => search()}>
            <SearchIcon />
          </Button>
        </div>
      </div>
      <div className={classes.tableContainer}>
        <TableContainer className={classes.table}>
          <Table>
          <TableRow className={classes.tableHeader}>
            <TableCell><Typography>ID</Typography></TableCell>
            <TableCell><Typography>Name</Typography></TableCell>
            <TableCell><Typography>Gradelevel</Typography></TableCell>
            <TableCell align="right"><Typography>Balance</Typography></TableCell>
            <TableCell align="center"><Typography>Discounts</Typography></TableCell>
            <TableCell align="left"><Typography>Actions</Typography></TableCell>
          </TableRow>
            {!tableLoader ? accountList() : accountListLoader()}         
          </Table>
        </TableContainer>
        <div className={classes.footerContainer}>
          <div>
            <Button className={classes.createReport} onClick={() => setReportModal(true)}>Create Report</Button>
          </div>
          <div className={classes.pagination}> 
            <TablePagination 
              count={accounts.length}
              rowsPerPage={10}
              page={page}
              rowsPerPageOptions={false}
              onChangePage={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default StudentAccount