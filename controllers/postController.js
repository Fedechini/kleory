const Post = require('../models/postModel');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: 'succes',
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};
