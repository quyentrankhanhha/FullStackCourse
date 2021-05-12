import React from 'react'
import PropTypes from 'prop-types'

export default function BlogForm(props) {
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={props.handleCreateBlog}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            name='title'
            value={props.newTitle}
            onChange={props.handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor='author'>Author</label>
          <input
            id='author'
            name='author'
            value={props.newAuthor}
            onChange={props.handleAuthorChange}
          />
        </div>
        <div>
          <label htmlFor='url'>Url</label>
          <input
            id='url'
            name='url'
            value={props.newUrl}
            onChange={props.handleUrlChange}
          />
        </div>
        <button id='addBlogBtn'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired
}
