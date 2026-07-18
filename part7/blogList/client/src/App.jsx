import { useEffect, useRef } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button, Typography, Box } from '@mui/material';


import BlogList from './components/BlogList';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Notification from './components/Notifications';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import ErrorBoundary from './components/ErrorBoundary';


import { useBlogStore, selectUser } from './store';
import blogService from './services/blogs';

const App = () => {
  const blogFormRef = useRef();
  const { initializeBlogs, user, setUser } = useBlogStore();

  useEffect(() => {
    
    initializeBlogs();

    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [initializeBlogs, setUser]);

  return (
    <Container>
      <AppBar position="static" sx={{ marginBottom: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Blog App</Typography>
          <Button color="inherit" component={Link} to="/blogs">blogs</Button>
          <Button color="inherit" component={Link} to="/create">new blog</Button>
          
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mx: 2, fontStyle: 'italic' }}>
                {user.name} logged in
              </Typography>
              <Button color="inherit" onClick={() => useBlogStore.getState().logout()}>
                logout
              </Button>
            </Box>
          ) : (
            <Button color="inherit" component={Link} to="/login">login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Notification />

      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route 
            path="/create" 
            element={
              user ? (
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm />
                </Togglable>
              ) : (
                <Navigate replace to="/login" />
              )
            } 
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<div>404 Page not found</div>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
};

export default App;