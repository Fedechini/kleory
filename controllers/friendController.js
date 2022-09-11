const Friend = require('../models/friendModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
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

  if (!acceptReq) {
    return next(new AppError('No document found with that ID', 404));
  }

  const sender = await User.findById(acceptReq.from._id);
  sender.addAsFriend(acceptReq, 'sender');
  await sender.save({ validateBeforeSave: false });

  req.user.addAsFriend(acceptReq, 'receiver');
  await req.user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'succes',
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

exports.deleteFriend = catchAsync(async (req, res, next) => {
  const userA = req.user;
  const userB = await User.findById(req.params.userId);

  if (!userB) {
    return next(new AppError('No user found with that ID', 404));
  }

  // delete userB from userA friends
  const i = userA.friends.indexOf(userB.id);
  if (i > -1) {
    userA.friends.splice(i, 1);
    await userA.save({ validateBeforeSave: false });
  } else {
    return next(new AppError('No friend found with that ID', 404));
  }

  // delete userA from userB friends
  const j = userB.friends.indexOf(userA.id);
  if (j > -1) {
    userB.friends.splice(j, 1);
    await userB.save({ validateBeforeSave: false });
  } else {
    return next(new AppError('No friend found with that ID', 404));
  }

  //TODO: delete accepted friendReq request from db
  const requestToDelete = await Friend.find();

  console.log(requestToDelete);

  res.status(204).json({
    status: 'succes',
    data: null,
  });
});

exports.getAllFriendRequest = factory.getAll(Friend);
exports.deleteFriendRequest = factory.deleteOne(Friend);
exports.getFriendRequest = factory.getOne(Friend);
exports.createFriendRequest = factory.createOne(Friend);
