import { Link } from 'react-router-dom'
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from '@mui/material'

const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h2>Blogs</h2>

      <TableContainer component = { Paper }>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              
               {[...blogs]
                 .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                 .map(blog => (
                 <TableRow key={blog.id}>
                   <TableCell>
                     <Link to={`/blogs/${blog.id}`}>
                       {blog.title}
                     </Link>
                    </TableCell>
                   <TableCell> {blog.author}</TableCell>
                </TableRow>
                 ))
               }
        </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList