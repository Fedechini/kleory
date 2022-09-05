const mongoose = require('mongoose');

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

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
