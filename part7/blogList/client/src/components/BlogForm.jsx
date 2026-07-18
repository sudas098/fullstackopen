import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useBlogStore } from '../store';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

 
  const createBlog = useBlogStore((state) => state.createBlog);
  const setNotification = useBlogStore((state) => state.setNotification);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await createBlog({ title, author, url });
      setNotification(`A new blog "${title}" by ${author} added`);
      
      // Clear form fields
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      setNotification('Error creating blog', 'error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>Create New Blog</Typography>
      
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        margin="normal"
        required
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        sx={{ mt: 2 }}
      >
        Create
      </Button>
    </Box>
  );
};

export default BlogForm;