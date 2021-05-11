import React, { useState } from 'react'
const Blog = ({ blog, handleLike, handleDelete }) => {
  const [detail, setDetail] = useState(false)

  const handleChangeDetail = () => {
    setDetail(!detail)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const fullView = () => (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={handleChangeDetail}>hide</button>
      <p>{blog.url}</p>
      likes {blog.likes}
      <button
        onClick={() => {
          handleLike(blog)
        }}
      >
        like
      </button>
      <p>{blog.author}</p>
      <button
        onClick={() => {
          handleDelete(blog)
        }}
      >
        remove
      </button>
    </div>
  )
  const hidenView = () => (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={handleChangeDetail}>view</button>
    </div>
  )

  return <div>{detail ? fullView() : hidenView()}</div>
}

export default Blog
