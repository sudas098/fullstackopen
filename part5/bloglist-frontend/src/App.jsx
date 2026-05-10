import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'

import { Container, AppBar, Toolbar, Button, Typography, Box } from '@mui/material'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/blogs')
    } catch (exception) {
      setNotification({ text: 'wrong credentials', type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
    navigate('/login')
  }

  const addNewBlog = async (blogObject) => {
    try {
      // Use the ref to hide the form after success
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
      setNotification({ text: `${savedBlog.title} by ${savedBlog.author} added`, type: 'success'})
      setTimeout(() => setNotification(null), 5000)
      navigate('/blogs')
    } catch (exception) {
      setNotification({ text: 'error adding blog', type: 'error' })
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLikes = async (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id || blog.user 
  }

  try {
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
  } catch (exception) {
    setNotification({ text: 'error updating likes', type: 'error' })
    setTimeout(() => setErrorMessage(null), 5000)
  }
}

  const padding = { padding: 5 };
  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static" sx={{ marginBottom: 2 }}>
  <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Blog App
    </Typography>
    <Button color="inherit" component={Link} to="/blogs" sx={style}>
      blogs
    </Button>
    <Button color="inherit" component={Link} to="/create" sx={style}>
      new blog
    </Button>
    {user ? (
      <>
        <Typography variant="body2" sx={{ mx: 2, fontStyle: 'italic' }}>
          {user.name} logged in
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
      </>
    ) : (
      <Button color="inherit" component={Link} to="/login" sx={style}>
        login
      </Button>
    )}
  </Toolbar>
</AppBar>
      

      <Notification notification={notification} />

      <Routes>
        <Route path="/blogs/:id" element={<Blog blogs={blogs} user={user} setBlogs={setBlogs}
         handleLikes={handleLikes} setNotification={setNotification} />} />
        <Route path="/blogs" element={<BlogList blogs={blogs} />} />
        <Route path="/create" element={
          user ? (
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={addNewBlog} />
            </Togglable>
          ) : <Navigate replace to="/login" />
        } />
        <Route path="/login" element={
          <LoginForm 
            username={username} password={password}
            setUsername={setUsername} setPassword={setPassword}
            handleLogin={handleLogin}
          />
        } />
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  )
}

export default App