const mongoose = require('mongoose');

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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
