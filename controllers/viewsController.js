const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');

exports.getHome = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort('-createdAt');

  res.status(200).render('home', {
    title: 'Home',
    posts,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('comments');

  res.status(200).render('post', {
    title: `${post.title}`,
    post,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};
