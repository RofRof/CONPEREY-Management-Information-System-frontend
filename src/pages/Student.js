import { React, useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core'

import ActionButton from '../components/utils/button'

const Student = () => {
  console.log(window.body)
  //const {id, firstname, lajstname, gradelevel} = props.studentList.studentList
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
      // borderBottom : '1px solid #b2b2b2', lightgrayish color
      '& > div': {
        marginTop: '10px',
      },
      '& > div:nth-child(1) > p:nth-child(1)': {
        fontSize: '1.1em',
        fontWeight: 'bold',
      },
    },
    actionButtonsContainer: {
      marginTop: '10px',
      width: '95%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    tableContainer: {
      width: '95%',
    },
  })
  const classes = styles()

   return (
    <div className={classes.root}>
      <div className={classes.header}> 
        <div>
          <Typography>Student Dashboard</Typography>
        </div>
        <div>
         <Typography>SY 2020-2021</Typography>
        </div> 
      </div>
      <div className={classes.actionButtonsContainer}>
        <div>
          <Select value="Grade 1">
            <MenuItem>Grade 1</MenuItem>
            <MenuItem>Grade 2</MenuItem>
            <MenuItem>Grade 3</MenuItem>
            <MenuItem>Grade 4</MenuItem>
          </Select>
        </div>
        <div>
          <TextField 
            label="Search Student" 
            variant="outlined"
            size="small"
          />
          <Button className={classes.searchButton}> 
            <SearchIcon />
          </Button>
        </div>
        
      </div>
      <div className={classes.tableContainer}>
        <TableContainer>
          <Table>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Gradelevel</TableCell>
                <TableCell>LRN</TableCell>
              </TableRow>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
export default Student