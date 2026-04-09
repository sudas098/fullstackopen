const app = require('./app');
const connectDB = require('./utils/db');
const config = require('./utils/config');

const start = async () => {
  await connectDB(); 

  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

start();