import asyncHandler from 'express-async-handler';

import { User } from '../models/user.js';
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
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export { getUsers, authUser };
