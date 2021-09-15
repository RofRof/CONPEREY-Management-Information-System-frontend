import React, { useEffect , useState, useCallback } from 'react'
import AutoComplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import debounce from 'lodash/debounce'

//Autocomplete 
const Test = () => {
  const [options, setOptions] = useState([])
  const [name, setName] = useState('')


  const recommendSearch = async(name) => {
    await fetch('http://localhost:5000/student/recommendSearch', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'name': name,
        'schoolyear': 2020
      }
    })
    .then((res) => res.json()).then((data) => {
      setOptions(data)
    })
  }

  const getOptionsDelayed = useCallback(
    debounce((text, callback) => {
      setOptions([])
      recommendSearch(text).then(callback)
    }, 200)
  ,[])

  useEffect(() => {
    recommendSearch(name)
    // getOptionsDelayed(name, (options) => {
    //   setOptions(options)
    // })
  }, [name])

  return(
    <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <AutoComplete 
        freeSolo
        options = {options.map((x) => x.studentname)}
        style={{ width: '350px' }}
        renderInput={(params) => {
          return(
            <TextField 
              {...params} 
              name="name"
              label="Search Student" 
              size="small" 
              value={name}
              variant="outlined"
              onChange = {debounce((e) => recommendSearch(e.target.value), 1000)}
            />
          )
        }}
      />
    </div>
  )
}

export default Test