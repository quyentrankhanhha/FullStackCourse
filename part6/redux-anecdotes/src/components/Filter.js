import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const userInput = event.target.value
    dispatch(filterChange(userInput))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
