import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

// Make a test which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default.
test('displaying a blog renders title and author, but does not render its url or number of likes', () => {
  const blog = {
    author: 'Nguyen Nhat Anh',
    title: 'Ha Do',
    likes: 144,
    url: 'localhost'
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('Ha Do')
  expect(component.container).not.toHaveTextContent('likes 144')
  expect(component.container).not.toHaveTextContent('localhost')
})

// Make a test which checks that the blog's url and number of likes are shown when the button controlling the shown details has been clicked.

test('renders content after click on View button', () => {
  const blog = {
    author: 'Nguyen Nhat Anh',
    title: 'Ha Do',
    likes: 144,
    url: 'localhost'
  }

  const component = render(<Blog blog={blog} />)

  let button = component.getByText('view')

  fireEvent.click(button)

  expect(component.container).toHaveTextContent('localhost')
  expect(component.container).toHaveTextContent('likes 144')
})

// Make a test which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.

test('double fire like button', () => {
  const blog = {
    author: 'Nguyen Nhat Anh',
    title: 'Ha Do',
    likes: 144,
    url: 'localhost'
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} handleLike={mockHandler} />)

  let button = component.getByText('view')
  fireEvent.click(button)

  button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
