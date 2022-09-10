const Friend = require('../models/friendModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setUserData = (req, res, next) => {
  if (!req.body.from) req.body.from = req.user.id;

  next();
};

exports.acceptFriend = catchAsync(async (req, res, next) => {
  const acceptReq = await Friend.findByIdAndUpdate(
    req.params.id,
    {
      status: 'accepted',
    },
    { new: true, runValidators: true }
  );

  const friendList = req.user.addAsFriend(acceptReq);
  await req.user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'succes',
    data: friendList,
  });
});

exports.rejectFriend = catchAsync(async (req, res, next) => {
  await Friend.findByIdAndUpdate(
    req.params.id,
    { status: 'rejected' },
    { new: true, runValidators: true }
  );

  res.status(204).json({
    status: 'succes',
    data: null,
  });
});

exports.getAllFriendRequest = factory.getAll(Friend);
exports.deleteFriendRequest = factory.deleteOne(Friend);
exports.getFriendRequest = factory.getOne(Friend);
exports.createFriendRequest = factory.createOne(Friend);
