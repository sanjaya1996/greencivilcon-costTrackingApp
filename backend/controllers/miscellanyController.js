import asyncHandler from 'express-async-handler';
import Miscellany from '../models/miscellany.js';

const getMiscellanies = asyncHandler(async (req, res) => {
  const miscellanies = await Miscellany.find({});

  res.json(miscellanies);
});

const createMiscellany = asyncHandler(async (req, res) => {
  const { mPhaseId, projectPhaseId, title, description, totalCost } = req.body;

  const miscellany = new Miscellany({
    title,
    description,
    totalCost,
    miniPhase: mPhaseId,
    projectPhase: projectPhaseId,
  });

  const createdMiscellany = await miscellany.save();
  res.status(201).json(createdMiscellany);
});

const updateMiscellany = asyncHandler(async (req, res) => {
  const { title, totalCost, description } = req.body;

  const miscellany = await Miscellany.findById(req.params.id);

  if (miscellany) {
    miscellany.title = title || miscellany.title;
    miscellany.description = description || miscellany.description;
    miscellany.totalCost = totalCost || miscellany.totalCost;

    const updatedMiscellany = await miscellany.save();

    res.json(updatedMiscellany);
  } else {
    res.status(404);
    throw new Error('Miscellany not found');
  }
});

const deleteMiscellany = asyncHandler(async (req, res) => {
  const miscellany = await Miscellany.findById(req.params.id);

  if (miscellany) {
    await miscellany.remove();

    res.json({ message: 'Miscellany Deleted' });
  } else {
    res.status(404);
    throw new Error('Miscellany not found');
  }
});

export {
  getMiscellanies,
  createMiscellany,
  updateMiscellany,
  deleteMiscellany,
};
