const mongoose = require('mongoose');
const ms = require('ms');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Post must have a title'],
      maxlength: [100, 'Title must have less or equal then 100 characters'],
    },
    body: {
      type: String,
      trim: true,
      required: [true, 'Post must have a body'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    commentsQuantity: {
      type: Number,
      default: 0,
    },
    likesQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual('postedAgo').get(function () {
  const msToDate = ms(Date.now() - this.createdAt);

  return `${msToDate} ago`;
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
