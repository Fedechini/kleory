const Post = require('../models/postModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Post, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const posts = await features.model;

  res.status(200).json({
    status: 'succes',
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.setUserData = (req, res, next) => {
  if (!req.body.author) req.body.author = req.user.id;

  next();
};

exports.getPost = factory.getOne(Post, { path: 'comments' });
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
