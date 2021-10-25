import React from 'react'

export const Notification = ({ message }) => {
  return (
    <div className='error'>
      <p>{message}</p>
    </div>
  )
}
