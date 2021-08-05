/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import { SearchContext } from '../context/SearchContext'

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
  },
}))

export default function Input() {

  const classes = useStyles('')
  const { value, setValue } = useContext(SearchContext)
  const [searchList, setSearchList] = useState()

  useEffect(() => {
    const edgeCase = ["no suggestions"]
    localStorage['search'] = JSON.stringify(edgeCase)
  },[])

  useEffect(() => {
    setTimeout(() => {
      const searchList = localStorage.getItem('search')
      setSearchList(JSON.parse(searchList))
    }, 2000)
  }, [value])

  return (
    <Autocomplete
      id="combo-box-demo"
      options={searchList}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) =>
        <TextField
          {...params}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
          }}
          onChange={(e) => setValue(e.target.value)}
          onSelect={(e) => setValue(e.target.value)}
          value={value}
        />}
    />
  );
}