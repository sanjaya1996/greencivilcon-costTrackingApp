import asyncHandler from 'express-async-handler';

import { User, UserProfile } from '../models/user.js';
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

// *****USER PROFILE****

const getUserProfiles = asyncHandler(async (req, res) => {
  const userProfiles = await UserProfile.find({});
  res.json(userProfiles);
});

const getMyProfile = asyncHandler(async (req, res) => {
  const myProfile = await UserProfile.findOne({ userId: req.user._id });

  res.json(myProfile);
});

const createUserProfile = asyncHandler(async (req, res) => {
  const { fName, lName, email, phone, jobTitle, profilePic } = req.body;

  const existedUserProfile = await UserProfile.findOne({
    userId: req.user._id,
  });

  if (!existedUserProfile) {
    const userProfile = new UserProfile({
      fName,
      lName,
      email,
      phone,
      jobTitle,
      profilePic,
      userId: req.user._id,
    });

    const createdUserProfile = await userProfile.save();

    res.status(201).json(createdUserProfile);
  } else {
    res.status(409);
    throw new Error('Profile already exist');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { fName, lName, email, phone, jobTitle, profilePic } = req.body;
  const userProfile = await UserProfile.findById(req.params.id);

  if (userProfile) {
    userProfile.fName = fName || userProfile.fName;
    userProfile.lName = lName || userProfile.lName;
    userProfile.email = email || userProfile.email;
    userProfile.phone = phone || userProfile.phone;
    userProfile.jobTitle = jobTitle || userProfile.jobTitle;
    userProfile.profilePic = profilePic || userProfile.profilePic;

    const updatedUserProfile = await userProfile.save();

    res.json(updatedUserProfile);
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

export {
  getUsers,
  authUser,
  signUpUser,
  getUserProfiles,
  getMyProfile,
  createUserProfile,
  updateUserProfile,
};
