import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      <h1>{message}</h1>
    </div>
  )
}

export default Notification
