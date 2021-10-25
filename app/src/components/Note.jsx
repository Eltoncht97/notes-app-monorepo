import React from 'react'

export const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'
  return (
    <li>
      <div>
        {note.content}
      </div>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
