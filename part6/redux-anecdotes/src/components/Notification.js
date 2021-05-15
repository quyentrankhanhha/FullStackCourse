import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)

  const isHidden = notification === ''

  if (isHidden) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return <div style={style}> {notification}</div>
}

export default Notification
