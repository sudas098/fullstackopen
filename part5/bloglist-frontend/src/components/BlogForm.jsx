import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div> <TextField 
                      label = 'title' 
                      value={title} 
                      onChange={({ target }) => setTitle(target.value)} /></div>
        <div><TextField 
         label = 'author' 
         value={author} 
         onChange={({ target }) => setAuthor(target.value)} /></div>
        <div> < TextField 
         label = 'link' 
         value={url} 
         onChange={({ target }) => setUrl(target.value)} /></div>
        <Button type="submit" variant='contained' style={{ marginTop: 10 }}>submit</Button>
      </form>
    </div>
  )
}

export default BlogForm