import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Link } from '@mui/material';
import { useBlogStore } from '../store';

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const blogs = useBlogStore((state) => state.blogs);
  const user = useBlogStore((state) => state.user);
  const removeBlog = useBlogStore((state) => state.removeBlog);
  const updateBlogLikes = useBlogStore((state) => state.updateBlogLikes);
  const setNotification = useBlogStore((state) => state.setNotification);

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return <Typography sx={{ mt: 2 }}>Loading blog data...</Typography>;
  }

  const handleLikes = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user?.id || blog.user,
      };
      await updateBlogLikes(blog.id, updatedBlog);
    } catch (error) {
      setNotification('Error updating likes', 'error');
    }
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      try {
        await removeBlog(blog.id);
        setNotification(`"${blog.title}" removed successfully`);
        navigate('/blogs');
      } catch (error) {
        setNotification('Error deleting blog', 'error');
      }
    }
  };

  const showDeleteButton = user && blog.user && blog.user.username === user.username;

  return (
    <Card variant="outlined" sx={{ marginTop: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>{blog.title}</Typography>
        <Typography variant="body1">By {blog.author}</Typography>

        <Box sx={{ my: 2 }}>
          <Link href={blog.url} target="_blank" rel="noopener">
            {blog.url}
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {blog.likes} likes
          </Typography>
          <Button variant="outlined" size="small" onClick={handleLikes}>
            Like
          </Button>
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Added by {blog.user ? blog.user.name : 'unknown'}
        </Typography>

        {showDeleteButton && (
          <Button variant="contained" color="error" size="small" onClick={deleteBlog}>
            Remove
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Blog;