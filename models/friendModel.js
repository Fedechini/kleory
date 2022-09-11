const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema(
  {
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
    status: {
      type: String,
      enum: ['sent', 'accepted', 'rejected'],
      default: 'sent',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// prevent user sending two friendReq to same user
friendSchema.index({ from: 1, to: 1 }, { unique: true });

friendSchema.pre(/^find/, function (next) {
  // show only pending request
  this.find({ status: 'sent' });

  this.populate({
    path: 'from',
    select: 'name photo',
  }).populate({
    path: 'to',
    select: 'name photo',
  });

  next();
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
