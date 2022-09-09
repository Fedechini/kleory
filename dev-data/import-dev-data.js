const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');

dotenv.config({ path: './config.env' });

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

// READ FILE
const comments = JSON.parse(
  fs.readFileSync(`${__dirname}/comments.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Comment.create(comments);
    console.log('data loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Comment.deleteMany();
    console.log('data deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
