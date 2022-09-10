const Friend = require('../models/friendModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllFriendRequest = catchAsync(async (req, res, next) => {
  const friendReq = await Friend.find();

  res.status(200).json({
    status: 'succes',
    results: friendReq.length,
    data: {
      friendRequests: friendReq,
    },
  });
});

exports.setUserData = (req, res, next) => {
  if (!req.body.from) req.body.from = req.user.id;

  next();
};

exports.acceptFriend = catchAsync(async (req, res, next) => {
  const accept = await Friend.findByIdAndUpdate(
    req.params.id,
    {
      status: 'accepted',
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'succes',
    data: accept,
  });
});

exports.rejectFriend = catchAsync(async (req, res, next) => {
  await Friend.findByIdAndUpdate(req.params.id, { status: 'rejected' });

  res.status(204).json({
    status: 'succes',
    data: null,
  });
});

exports.deleteFriendRequest = factory.deleteOne(Friend);
exports.getFriendRequest = factory.getOne(Friend);
exports.createFriendRequest = factory.createOne(Friend);
