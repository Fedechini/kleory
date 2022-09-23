const mongoose = require('mongoose');
const ms = require('ms');

// TODO: implement likes & likesQuantity in posts

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
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Post must belong to an user'],
    },
    commentsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual populate - so we dont store big array in DB
postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'name photo',
  });

  next();
});

postSchema.virtual('postedAgo').get(function () {
  const time = ms(Date.now() - this.createdAt);
  return `${time} ago`;
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
