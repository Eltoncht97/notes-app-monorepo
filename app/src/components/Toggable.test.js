import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { Toggable } from './Toggable'

describe('<Toggable />', () => {
  const buttonLabel = 'show'
  let component

  beforeEach(() => {
    component = render(
      <Toggable buttonLabel={buttonLabel}>
        <div>testDiv</div>
      </Toggable>
    )
  })

  test('renders its children', () => {
    component.getByText('testDiv')
  })

  test('children is none visible at the start', () => {
    const el = component.getByText('testDiv')
    // se usa el parent node ya que el estilo lo tiene el componente no el div
    expect(el.parentNode).toHaveStyle('display: none')
  })

  test('children is visible after clicking the button', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.getByText('testDiv')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })
})
