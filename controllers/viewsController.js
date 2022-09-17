const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');

exports.getHome = catchAsync(async (req, res) => {
  const posts = await Post.find().sort('-createdAt');

  res.status(200).render('home', {
    title: 'Home',
    posts,
  });
});

exports.getPost = (req, res) => {
  res.status(200).render('post', {
    title: 'Post',
  });
};
