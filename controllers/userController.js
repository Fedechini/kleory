const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedToUpdate) => {
  const newObject = {};
  Object.keys(obj).forEach((key) => {
    if (allowedToUpdate.includes(key)) newObject[key] = obj[key];
  });

  return newObject;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'succes',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate({
    path: 'posts',
    select: 'title -author',
  });

  if (!user) {
    return next(new AppError('There is no user with that ID', 404));
  }

  res.status(200).json({
    status: 'succes',
    data: {
      user,
    },
  });
});

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
