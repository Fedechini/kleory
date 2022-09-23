const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have a name'],
      maxlength: [20, 'Username must not be longer than 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: { type: String, default: 'default.jpg' },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // this validator only works on CREATE() and SAVE()
        validator: function (passwordConfirm) {
          return passwordConfirm === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    passwordChangedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: true,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'author',
  localField: '_id',
});

userSchema.virtual('friendReq', {
  ref: 'Friend',
  foreignField: 'to',
  localField: '_id',
});

// hash password if is been modified / new user created
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // delete passwordConfirm field, only needed for validation
  this.passwordConfirm = undefined;
  next();
});

// update passwordChangedAt
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// show active users only
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.isPasswordValid = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    // convert to ms
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // false means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // expires in 10min
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.addAsFriend = function (friendReq, role) {
  if (role === 'sender') {
    if (
      !this.friends.includes(friendReq.to.id) &&
      this._id !== friendReq.to.id
    ) {
      this.friends.push(friendReq.to.id);
    }
  }

  if (role === 'receiver') {
    if (
      !this.friends.includes(friendReq.from.id) &&
      this._id !== friendReq.from.id
    ) {
      this.friends.push(friendReq.from.id);
    }
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
