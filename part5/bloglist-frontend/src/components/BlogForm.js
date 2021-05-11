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
            name='title'
            value={props.newTitle}
            onChange={props.handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor='author'>Author</label>
          <input
            name='author'
            value={props.newAuthor}
            onChange={props.handleAuthorChange}
          />
        </div>
        <div>
          <label htmlFor='url'>Url</label>
          <input
            name='url'
            value={props.newUrl}
            onChange={props.handleUrlChange}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired
}
