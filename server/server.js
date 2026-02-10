require('dotenv').config({ path: './serversecrets.env' });

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const start = async () => {
  // Connect to MongoDB (skips if MONGODB_URI not set)
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
