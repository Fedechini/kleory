const mongoose = require('mongoose');
const dotenv = require('dotenv');

// safety net for uncaught sync code err
process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXEPTION! ❌ Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!😎'));

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// safety net for uncaught async code rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! ❌ Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
