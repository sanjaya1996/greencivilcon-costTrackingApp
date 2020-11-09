import asyncHandler from 'express-async-handler';

import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({ users });
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
      expiresIn: '3600',
    });
  } else {
    res.status(409);
    throw new Error('Invalid email or password');
  }
});

const signUpUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(409);
    throw new Error('Email already exist');
  }

  const user = await User.create({
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
      expiresIn: '3600',
    });
  }
});

export { getUsers, authUser, signUpUser };
