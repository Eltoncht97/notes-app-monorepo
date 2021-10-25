import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { login } from '../services/login'
import { Toggable } from './Toggable'
import noteService from '../services/notes'

export const LoginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({ username, password })

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      noteService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong cretentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <Toggable buttonLabel='Show Login!'>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id='form-login-button'>Login</button>
      </form>
    </Toggable>
  )
}

LoginForm.protoTypes = {
  setUser: PropTypes.func.isRequired
}
