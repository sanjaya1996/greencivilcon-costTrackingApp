import asyncHandler from 'express-async-handler';
import Labor from '../models/labor.js';

const getLabors = asyncHandler(async (req, res) => {
  const labors = await Labor.find({});

  res.json(labors);
});

const createLabor = asyncHandler(async (req, res) => {
  const {
    fName,
    lName,
    email,
    phone,
    role,
    payRate,
    availability,
    accountDetails,
    amountPaid,
    supervisorId,
    projectPhaseId,
    mPhaseId,
    description,
  } = req.body;

  const labor = new Labor({
    fName,
    lName,
    email,
    role,
    phone,
    payRate,
    availability,
    amountPaid,
    accountDetails,
    projectPhase: projectPhaseId,
    supervisor: supervisorId,
    miniPhase: mPhaseId,
    description,
  });

  const createdLabor = await labor.save();

  res.status(201).json(createdLabor);
});

const updateLabor = asyncHandler(async (req, res) => {
  const {
    fName,
    lName,
    email,
    phone,
    role,
    payRate,
    availability,
    accountDetails,
    amountPaid,
    description,
  } = req.body;

  const labor = await Labor.findById(req.params.id);

  if (labor) {
    labor.fName = fName || labor.fName;
    labor.lName = lName || labor.lName;
    labor.email = email || labor.email;
    labor.phone = phone || labor.phone;
    labor.role = role || labor.role;
    labor.payRate = payRate || labor.payRate;
    labor.availability = availability || labor.availability;
    labor.accountDetails = accountDetails || labor.accountDetails;
    labor.amountPaid = amountPaid || labor.amountPaid;
    labor.description = description || labor.description;

    const updatedLabor = await labor.save();

    res.json(updatedLabor);
  } else {
    res.status(404);
    throw new Error('Labor not found');
  }
});

const deleteLabor = asyncHandler(async (req, res) => {
  const labor = await Labor.findById(req.params.id);

  if (labor) {
    await labor.remove();

    res.json({ message: 'Labor Deleted' });
  } else {
    res.status(404);
    throw new Error('Labor not found');
  }
});

export { getLabors, createLabor, updateLabor, deleteLabor };
