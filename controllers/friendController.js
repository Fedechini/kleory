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

exports.deleteFriendRequest = factory.deleteOne(Friend);
exports.getFriendRequest = factory.getOne(Friend);
exports.createFriendRequest = factory.createOne(Friend);
