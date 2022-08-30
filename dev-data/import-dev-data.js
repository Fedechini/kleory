const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Post = require('../models/postModel');

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
const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Post.create(posts);
    console.log('data loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Post.deleteMany();
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
