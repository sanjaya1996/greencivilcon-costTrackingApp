import asyncHandler from 'express-async-handler';

import Manager from '../models/manager.js';

const getManagers = asyncHandler(async (req, res) => {
  const managers = await Manager.find({});

  res.json(managers);
});

const getMyManagers = asyncHandler(async (req, res) => {
  const managers = await Manager.find({ supervisor: req.user._id });

  res.json(managers);
});

const createManager = asyncHandler(async (req, res) => {
  const { fName, lName, email, phone } = req.body;

  const manager = new Manager({
    fName,
    lName,
    email,
    phone,
    supervisor: req.user._id,
  });

  const createdManager = await manager.save();

  res.status(201).json(createdManager);
});

const updateManager = asyncHandler(async (req, res) => {
  const { fName, lName, email, phone } = req.body;
  const manager = await Manager.findById(req.params.id);

  if (manager) {
    manager.fName = fName || manager.fName;
    manager.lName = lName || manager.lName;
    manager.email = email || manager.email;
    manager.phone = phone || manager.phone;

    const updatedManager = await manager.save();
    res.json(updatedManager);
  } else {
    res.status(404);
    throw new Error('Manager not found');
  }
});

const deleteManager = asyncHandler(async (req, res) => {
  const manager = await Manager.findById(req.params.id);

  if (manager) {
    manager.remove();
    res.json({ message: 'Manager Removed' });
  } else {
    res.status(404);
    throw new Error('Manager not found');
  }
});

export {
  getManagers,
  getMyManagers,
  createManager,
  updateManager,
  deleteManager,
};
