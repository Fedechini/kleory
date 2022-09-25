const mongoose = require('mongoose');
const Post = require('./postModel');
const ms = require('ms');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'A comment can not be empty'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Comment must belong to a post'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to an user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

commentSchema.statics.calcCommentsQuantity = async function (postId) {
  // this = model
  const stats = await this.aggregate([
    {
      $match: { post: postId },
    },
    {
      $group: {
        _id: '$post',
        comments: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Post.findByIdAndUpdate(postId, {
      commentsQuantity: stats[0].comments,
    });
  } else {
    await Post.findByIdAndUpdate(postId, { commentsQuantity: 0 });
  }
};

commentSchema.post('save', function () {
  // this = current comment // this.constructor = model
  this.constructor.calcCommentsQuantity(this.post);
});

commentSchema.post('findOneAndDelete', async function (doc) {
  // doc = current comment
  await doc.constructor.calcCommentsQuantity(doc.post);
});

commentSchema.virtual('postedAgo').get(function () {
  const time = ms(Date.now() - this.createdAt);
  return `${time} ago`;
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
