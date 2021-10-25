import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { Note } from './Note'

test('renders content', () => {
  const note = {
    content: 'This is a note',
    important: true
  }

  const component = render(<Note note={note} />)

  // 15 y 16 son iguales
  component.getByText(note.content)
  // expect(component.container).toHaveTextContent(note.content)
  component.getByText('make not important')

  // component.debug() permite ver lo que renderiza el componente
})

test('clicking the buttons calls event handler once', () => {
  const note = {
    content: 'This is a note',
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(<Note note={note} toggleImportance={mockHandler} />)
  const button = component.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(1)
})
