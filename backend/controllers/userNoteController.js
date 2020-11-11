import asyncHandler from 'express-async-handler';

import UserNote from '../models/userNote.js';

const getUserNotes = asyncHandler(async (req, res) => {
  const userNotes = await UserNote.find({});

  res.json(userNotes);
});

const getMyUserNotes = asyncHandler(async (req, res) => {
  const userNotes = await UserNote.find({ user: req.user._id });

  res.json(userNotes);
});

const createUserNote = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    images,
    pickedDateTime,
    notificationId,
  } = req.body;

  const userNote = new UserNote({
    title,
    description,
    images,
    pickedDateTime,
    notificationId,
    user: req.user._id,
  });

  const createdUserNote = await userNote.save();

  res.status(201).json(createdUserNote);
});

const updateUserNote = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    images,
    pickedDateTime,
    notificationId,
  } = req.body;
  const userNote = await UserNote.findById(req.params.id);

  if (userNote) {
    userNote.title = title || userNote.title;
    userNote.description = description || userNote.description;
    userNote.images = images || userNote.images;
    userNote.pickedDateTime = pickedDateTime || userNote.pickedDateTime;
    userNote.notificationId = notificationId || userNote.notificationId;

    const updatedUserNote = await userNote.save();
    res.json(updatedUserNote);
  } else {
    res.status(404);
    throw new Error('User note not found');
  }
});

const deleteUserNote = asyncHandler(async (req, res) => {
  const userNote = await UserNote.findById(req.params.id);
  if (userNote) {
    userNote.remove();
    res.json({ message: 'User Note Removed' });
  } else {
    res.status(404);
    throw new Error('User Note not found');
  }
});

export {
  getUserNotes,
  getMyUserNotes,
  createUserNote,
  updateUserNote,
  deleteUserNote,
};
