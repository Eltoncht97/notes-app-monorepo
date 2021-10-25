import { useEffect, useState } from 'react'
import './App.css'
import { LoginForm } from './components/LoginForm'
import { Note } from './components/Note'
import { NoteForm } from './components/NoteForm'
import { Notification } from './components/Notification'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])

  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  // TODO refactoring de login

  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true)
    noteService.getNotes().then((notas) => {
      setNotes(notas)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
    noteService.createNote(noteObject).then((nota) => {
      setNotes([...notes, nota])
    })
  }

  const toggleImportance = () => {
    setShowAll(() => !showAll)
  }

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <>
      <h1>Mis Notas</h1>
      <Notification message={errorMessage} />
      {user
        ? (
          <NoteForm addNote={addNote} handleLogout={handleLogout} />
          )
        : (
          <LoginForm
            setUser={setUser}
            setErrorMessage={setErrorMessage}
          />
          )}
      <button onClick={toggleImportance}>
        {showAll ? 'Show only important' : 'Show all'}
      </button>
      {loading ? 'Cargando...' : ''}
      <ol>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={toggleImportance} />
        ))}
      </ol>
    </>
  )
}

export default App
