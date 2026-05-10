import { useParams, useNavigate } from 'react-router-dom'
import BlogServices from '../services/blogs'
import { Card, CardContent, Typography, Button, Link, Box } from '@mui/material'

const Blog = ({ blogs, user, setBlogs, handleLikes, setNotification }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return <Typography>Loading blog data...</Typography>
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await BlogServices.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setNotification({ text: `${blog.title} removed`, type: 'success' })
        navigate('/blogs')
      } catch (err) {
        console.error('Error deleting blog', err)
      }
    }
  }

  const showDeleteButton = user && blog.user && blog.user.username === user.username

  return (
    <Card variant="outlined" sx={{ marginTop: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {blog.title}
        </Typography>
        
        <Typography variant="body1">
          by {blog.author}
        </Typography>

        <Box sx={{ my: 1 }}>
          <Link href={blog.url} target="_blank" rel="noopener">
            {blog.url}
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {blog.likes} likes
          </Typography>
          <Button variant="outlined" size="small" onClick={() => handleLikes(blog)}>
            like
          </Button>
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          added by {blog.user ? blog.user.name : 'unknown'}
        </Typography>

        {showDeleteButton && (
          <Button variant="contained" color="error" size="small" onClick={deleteBlog}>
            remove
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default Blog