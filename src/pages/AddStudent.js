import { React, useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import SnackBar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core'
import ActionButton from '../components/utils/button'

const AddStudent = () => {

  const [state, setState] = useState({
    schoolyear: 2020,
    token: sessionStorage.getItem("userToken")
  })
  const [student, setStudent] = useState({
    firstname: "",
    middle: "",
    lastname: "",
    city: "",
    municipality: "",
    province: "",
    birthdate: "",
    sex: "M",
    gradeLevel: "Grade 1",
  })
  const [response, setResponse] = useState({
    snackbar: false,
    status: 0,
    message: ''
  })
  const [loader, setLoader] = useState(false)

  const styles = makeStyles({
    root: {
      backgroundColor: 'white',
      margin: '25px 25px 0px 25px',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '95%',
      // borderBottom : '1px solid #b2b2b2',
      '& > div': {
        marginTop: '10px',
      },
      '& > div:nth-child(1) > p:nth-child(1)': {
        fontSize: '1.1em',
        fontWeight: 'bold',
      },
    },
    form: {
      width: '95%',
      marginTop: '30px',
      display: 'grid',
      gridTemplateRows: '1fr 1fr 1fr',
      gap: '15px',
      '& > div:nth-child(1) > div': { //Student name div items
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '20px',
      },
      '& > div:nth-child(2) > div': { //Address div items
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '20px',
      },
      '& > div:nth-child(3) > div': { //Personal info div items
        display: 'grid',
        gridTemplateColumns: '200px 50px 100px',
        gap: '20px',
      },
      '& > div:nth-child(4)': {
        display: 'flex',
        justifyContent: 'flex-end',
        '& > div:': {
          width: '150px',
        },
      }
    },
    formControl: {
      '& > p': {
        color: '#8B8D8F',
        fontSize: '0.9em',
      },
    },
    enrollContainer: {
      width: '100px',
    },
    snackbarContentSuccess: {
      backgroundColor: '#30CC25',
      color: 'white',
      width: '250px',
      height: '40px',
      borderRadius: '0.2em',
      display: 'flex',
      alignItems: 'center',
      
      '& > p': {
        marginLeft: '10px',
        fontSize: '0.8em'
      },
    },
    snackbarContentError: {
      backgroundColor: '#F03330',
      color: 'white',
      width: '250px',
      height: '40px',
      borderRadius: '0.2em',
      display: 'flex',
      alignItems: 'center',
      '& > p': {
        marginLeft: '10px',
        fontSize: '0.8em'
      },
    }
  })
  const classes = styles()

  //functions
  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleInput = (e) => {
    setStudent({...student, [e.target.name]: e.target.value})
  }
  
  const addStudent = async() => {
    const {firstname, middle, lastname, city, municipality, province, birthdate, sex, gradeLevel} = student
    setLoader(true)
    try{
      await fetch('http://localhost:5000/student/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': state.token
        },
        body: JSON.stringify({
          firstname: firstname.trim(),
          middle: middle.trim(),
          lastname: lastname.trim(),
          city: city,
          municipality: municipality,
          province: province,
          birthdate: birthdate,
          sex: sex,
          gradeLevel: gradeLevel,
          schoolyear: state.schoolyear,
        })
      })
      .then((res) => res.json())
      .then((data) => {
        setResponse({...response, snackbar: true, status: data.status, message: data.message})
        if(data.status >= 400){
          setLoader(false)
        }  
        else{
          setStudent({
            ...student,
            firstname: '',
            middle: '',
            lastname: '',
            city: '',
            municipality: '',
            province: '',
          })
          setLoader(false)
        }
      })
    }
    catch(error){
      return error
    }    
  }

  return(
    <div className={classes.root}>
      <div className={classes.header}> 
        <div>
          <Typography>Enrollment Form</Typography>
        </div>
        <div>
          <Typography>SY {state.schoolyear}-{state.schoolyear + 1}</Typography>
        </div> 
      </div>
      <div className={classes.form}>
          <div>
            <Typography>Student Name</Typography>
            <div>
              <FormControl className={classes.formControl}>
                <Typography>First</Typography>
                <TextField 
                  size="small" 
                  name="firstname"
                  value={student.firstname}                  
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <Typography>Middle Initial</Typography>
                <TextField  
                  size="small" 
                  name="middle"
                  value={student.middle} 
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <Typography>Last</Typography>
                <TextField 
                  size="small" 
                  name="lastname"
                  value={student.lastname} 
                  onChange={handleInput}
                />
              </FormControl>
            </div>
          </div>
          <div>
            <Typography>Address</Typography>
            <div>
              <FormControl className={classes.formControl}>
                <Typography>City/Brgy</Typography>
                <TextField 
                  size="small" 
                  name="city"
                  value={student.city} 
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
              <Typography>Municipality</Typography>
              <TextField 
                size="small" 
                name="municipality"
                value={student.municipality} 
                onChange={handleInput}
              />
              </FormControl>
              <FormControl className={classes.formControl}>
                <Typography>Province</Typography>
                <TextField 
                  size="small" 
                  name="province"
                  value={student.province} 
                  onChange={handleInput}
                />
              </FormControl> 
            </div>
          </div>
          <div>
            <Typography>Personal Info</Typography>
            <div>
              <FormControl className={classes.formControl}>
                <Typography>Birthdate</Typography>
                <TextField 
                  type="date"
                  name="birthdate"
                  value={student.birthdate} 
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <Typography>Sex</Typography>
                <Select 
                  name="sex" 
                  value={student.sex}
                  onChange={handleInput}
                >
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="F">F</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Typography>Gradelevel</Typography>
                <Select 
                  name="gradeLevel" 
                  value={student.gradeLevel} 
                  onChange={handleInput}
                >
                  <MenuItem value="Grade 1">Grade 1</MenuItem>
                  <MenuItem value="Grade 2">Grade 2</MenuItem>
                  <MenuItem value="Grade 3">Grade 3</MenuItem>
                  <MenuItem value="Grade 4">Grade 4</MenuItem>
                  <MenuItem value="Grade 5">Grade 5</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div>
            <div className={classes.enrollContainer}>
              <ActionButton 
                loader={loader}
                loaderSize={20}
                loaderColor="white"
                text="Enroll" 
                color="orange" 
                onClick={addStudent}
              />
              <SnackBar 
                open={response.snackbar}
                autoHideDuration={3000}
                onClose={() => setResponse({...response, snackbar: false})}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <div className={response.status >= 400 ? classes.snackbarContentError : classes.snackbarContentSuccess}>
                  <Typography>{response.message}</Typography>
                </div>
              </SnackBar>  
            </div>
          </div>
        </div>
    </div>
  )
}

export default AddStudent