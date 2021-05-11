import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort((a, b) => {
          return a.likes - b.likes
        })
      )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      user.token = blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('Login successfully')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      setUser(null)
      window.localStorage.clear()
      setErrorMessage('Logout Successfully')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    blogService.create(blogObject).then(
      (returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        blogFormRef.current.toggleVisibility()
      },
      (err) => {
        setErrorMessage('err: ', err)
      }
    )
  }

  const handleLike = (blog) => {
    let blogUpdated = { ...blog, likes: blog.likes + 1 }
    blogService.update(blog.id, blogUpdated).then(() => {
      const newBlogs = [...blogs]

      // find the index of blog which is liked
      newBlogs[blogs.findIndex((el) => el.id === blog.id)] = blogUpdated

      newBlogs.sort((a, b) => {
        return a.likes - b.likes
      })
      setBlogs(newBlogs)
    })
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.deleteOne(blog.id)
      const newBlogs = blogs.filter((el) => el.id !== blog.id)
      setBlogs(newBlogs)
    }
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleSubmit={handleLogin}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    ></LoginForm>
  )

  const loggedView = () => (
    <div>
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable
        buttonLabelFirst='New note'
        buttonLabelSecond='Cancel'
        ref={blogFormRef}
      >
        <BlogForm
          handleCreateBlog={handleCreateBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          handleAuthorChange={({ target }) => setNewAuthor(target.value)}
          handleTitleChange={({ target }) => setNewTitle(target.value)}
          handleUrlChange={({ target }) => setNewUrl(target.value)}
        ></BlogForm>
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
        ></Blog>
      ))}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

      {user === null ? loginForm() : loggedView()}
    </div>
  )
}

export default App
