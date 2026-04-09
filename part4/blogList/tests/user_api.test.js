const { test, before,after , beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const connectDB = require('../utils/db');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const User = require('../modules/user');
const bcrypt = require('bcrypt');

before( async () => {
    await connectDB(process.env.TEST_MONGODB)
})

beforeEach(async () => {
    await User.deleteMany({});

    const user = new User(helper.initialUsers[0])
    await user.save()
})

test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Peter123', 
      name: 'Duplicate User',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400) 
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.error, 'expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if password is too short', async () => {
    const newUser = {
      username: 'validuser',
      name: 'Valid Name',
      password: '12', 
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert(result.body.error.includes('password must be at least 3 characters long'))
  })

  after(async () => {
    await mongoose.connection.close();
  });

