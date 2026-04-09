const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../modules/blog');
const User = require('../modules/user');
const middleware = require('../utils/middleware');


// GET all
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

// GET by id
blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

// POST
blogsRouter.post('/',middleware.tokenExtractor ,middleware.userExtractor , async (req, res, next) => {
  try {
   
    const body = req.body;
    const user = req.user;

    if (!body.title || !body.author) {
      return res.status(400).json({
        error: 'title and author required',
      });
    }
   if (!user) {
    return res.status(401).json({error: 'token missing or invalid'})
   } 
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save(); 
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
    res.status(201).json(populatedBlog);
  } catch (error) {
    next(error);
  }
});

// DELETE
blogsRouter.delete('/:id' , async (req, res, next) => {
  try {
    const user = req.user;
    const blog = await Blog.findById(req.params.id);

    if (!user || !blog || blog.user.toString() !== user.id.toString()) {
      return res.status(401).json({error: 'unauthorized to delete this blog'});
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// PUT (update)
blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const body = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
      },
      { new: true, runValidators: true, context: 'query' }
    );

    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;