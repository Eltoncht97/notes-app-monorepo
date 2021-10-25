import React, { useRef, useState } from 'react'
import { Toggable } from './Toggable'

export const NoteForm = ({ addNote, handleLogout }) => {
  const [newNote, setNewNote] = useState('')

  const toggableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteToAddToState = {
      content: newNote
    }

    addNote(noteToAddToState)
    setNewNote('')
    toggableRef.current.toggleVisibility()
  }
  console.log(toggableRef)

  return (
    <Toggable buttonLabel='New Note' ref={toggableRef}>
      <h3>Create a new note</h3>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={handleChange}
          value={newNote}
          placeholder='Write your note content'
        />
        <button type='submit'>Crear nota</button>
      </form>

      <div>
        <button onClick={handleLogout}>Cerrar Sesion</button>
      </div>
    </Toggable>
  )
}
