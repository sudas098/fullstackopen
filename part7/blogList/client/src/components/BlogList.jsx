import { Link } from 'react-router-dom';
import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper, 
  Typography, 
  Box 
} from '@mui/material';
import { useBlogStore, selectBlogs } from '../store';

const BlogList = () => {

  const blogs = useBlogStore(selectBlogs);

 
  const containerStyle = {
    paddingTop: 2,
    marginBottom: 5,
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h4" gutterBottom>Blogs</Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id} hover>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BlogList;