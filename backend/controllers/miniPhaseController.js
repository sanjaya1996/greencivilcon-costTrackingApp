import asyncHandler from 'express-async-handler';

import MiniPhase from '../models/miniPhase.js';

const getMiniPhases = asyncHandler(async (req, res) => {
  const miniPhases = await MiniPhase.find({});

  res.json(miniPhases);
});

const createMiniPhase = asyncHandler(async (req, res) => {
  const { title, description, status, phaseId } = req.body;

  const miniPhase = new MiniPhase({
    title,
    description,
    status,
    projectPhase: phaseId,
  });

  const createdMiniPhase = await miniPhase.save();

  res.status(201).json(createdMiniPhase);
});

const updateMiniPhase = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  const miniPhase = await MiniPhase.findById(req.params.id);

  if (miniPhase) {
    miniPhase.title = title || miniPhase.title;
    miniPhase.description = description || miniPhase.description;
    miniPhase.status = status || miniPhase.status;

    const updatedMiniPhase = await miniPhase.save();

    res.json(updatedMiniPhase);
  } else {
    res.status(404);
    throw new Error('MiniPhase not found');
  }
});

const deleteMiniPhase = asyncHandler(async (req, res) => {
  const miniPhase = await MiniPhase.findById(req.params.id);

  if (miniPhase) {
    await miniPhase.remove();

    res.json({ message: 'MiniPhase removed' });
  } else {
    res.status(404);
    throw new Error('MiniPhase not found');
  }
});

export { getMiniPhases, createMiniPhase, updateMiniPhase, deleteMiniPhase };
