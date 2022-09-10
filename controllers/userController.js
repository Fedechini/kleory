const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedToUpdate) => {
  const newObject = {};
  Object.keys(obj).forEach((key) => {
    if (allowedToUpdate.includes(key)) newObject[key] = obj[key];
  });

  return newObject;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;

  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return new AppError(
      'To update your password please use /updateMyPassword',
      400
    );
  }

  // fields allowed to update
  const filteredBody = filterObj(req.body, 'name', 'email');

  // update user
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'succes',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'succes',
    data: null,
  });
});

exports.getUser = factory.getOne(User, [
  {
    path: 'posts',
    select: 'title -author',
  },
  { path: 'friendReq', select: 'from -to' },
  { path: 'friends', select: 'name photo' },
]);

exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
