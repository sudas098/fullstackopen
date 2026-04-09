const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async (url) => {
  const mongoUrl = url || config.MONGODB_URL;

  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log('connected to MongoDB');
  } catch (error) {
    console.error('error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;