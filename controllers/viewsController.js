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

exports.getSignupForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('signup', {
      title: 'Create an account',
    });
};

exports.getForgotPasswordForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('passwordForgot', {
      title: 'Forgot my password',
    });
};

exports.getPasswordResetForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('passwordReset', {
      title: 'Reset my password',
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

exports.getMe = (req, res) => {
  res.status(200).render('me', {
    title: 'My profile',
  });
};

exports.getMyPosts = async (req, res, next) => {
  const posts = await Post.find({ author: req.user.id }).sort('-createdAt');

  res.status(200).render('home', {
    title: 'My Posts',
    posts,
  });
};

exports.getProfile = async (req, res, next) => {
  const profile = await User.findById(req.params.userId).populate('posts');

  res.status(200).render('profile', {
    title: `${profile.name.split(' ')[0]}'s Profile`,
    profile,
  });
};

exports.getMyFriends = async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate('friendReq')
    .populate({ path: 'friends', select: 'name photo' });

  res.status(200).render('friends', {
    title: 'My Friends',
    user,
  });
};
