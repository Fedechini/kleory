const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Friend request must have a sender'],
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Friend request must have a recipient'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

friendSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'from',
    select: 'name photo',
  });
  this.populate({
    path: 'to',
    select: 'name photo',
  });

  next();
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
