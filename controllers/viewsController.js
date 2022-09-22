const Post = require('../models/postModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('login', {
      title: 'Log into your account',
    });
};

exports.getHome = catchAsync(async (req, res, next) => {
  if (!res.locals.user) return this.getLoginForm(req, res);

  const posts = await Post.find().sort('-createdAt');

  res.status(200).render('home', {
    title: 'Home',
    posts,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  if (!res.locals.user) return this.getLoginForm(req, res);

  const post = await Post.findById(req.params.id).populate('comments');

  if (!post) return next(new AppError('No post found with that ID.', 404));

  res.status(200).render('post', {
    title: `${post.title}`,
    post,
  });
});

exports.getProfile = (req, res) => {
  res.status(200).render('profile', {
    title: 'Your profile',
  });
};
