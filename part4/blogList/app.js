const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginsRouter = require('./controllers/logins');

const app = express();

mongoose.connect(config.MONGODB_URL);

app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

if ( process.env.NODE_ENV === 'test') {
    
    const testRouter = require('./controllers/testing');
    app.use('/api/testing', testRouter);
}

app.use('/api/users', usersRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/logins', loginsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;