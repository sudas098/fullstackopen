const { test, after, beforeEach, describe, before } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)
const Blog = require('../modules/blog')
const User = require('../modules/user')
const helper = require('./test_helper')

before('connection to mongoDb', async() => {
   await connectDb(process.env.TEST_MONGODB_URL)
})

let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  
  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({
    username: 'testuser',
    name: 'Test Admin',
    passwordHash
  })

  const savedUser = await user.save()

 
  const loginResponse = await api
    .post('/api/logins')
    .send({ username: 'testuser', password: 'password' })

  token = loginResponse.body.token

  
  const blogObjects = helper.initialBlogs.map(blog => 
    new Blog({ ...blog, user: savedUser._id })
  )
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Think and grow rich',
      author: 'Napoleon Hill',
      url: 'http://example.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    assert(titles.includes('Think and grow rich'))
  })

  
  test('fails with 401 Unauthorized if token is not provided', async () => {
    const newBlog = {
      title: 'Unauthorized Blog',
      author: 'Unknown',
      url: 'http://unauthorized.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('likes property default value is zero', async () => {
    const newBlog = {
      title: 'Atomic Attraction',
      author: 'Christopher Canwell',
      url: 'http://example.com',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    assert.strictEqual(response.body.likes, 0)
  })

  test('fails with 400 if data invalid', async () => {
    const newBlog = { author: 'No Title' }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  
  test('succeeds with status code 204 if id is valid and user is owner', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })

  test('fails with 401 if token is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})