import asyncHandler from 'express-async-handler';

import { MiniPhase, SpecialMiniPhase } from '../models/miniPhase.js';
import Labor from '../models/labor.js';
import Material from '../models/material.js';
import Miscellany from '../models/miscellany.js';

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
    const specialMphase = await SpecialMiniPhase.findOne({
      'miniPhase._id': req.params.id,
    });
    if (specialMphase) {
      await specialMphase.remove();
    }
    //delete other child resources of MiniPhase
    await Labor.deleteMany({ miniPhase: req.params.id });
    await Material.deleteMany({ miniPhase: req.params.id });
    await Miscellany.deleteMany({ miniPhase: req.params.id });

    await miniPhase.remove();

    res.json({ message: 'MiniPhase removed' });
  } else {
    res.status(404);
    throw new Error('MiniPhase not found');
  }
});

//Special MiniPhases

const getSpecialMphases = asyncHandler(async (req, res) => {
  const specialMphases = await SpecialMiniPhase.find({});

  res.json(specialMphases);
});

const toogleSpecialMphase = asyncHandler(async (req, res) => {
  const miniPhase = await MiniPhase.findById(req.params.mPhaseId);

  if (miniPhase) {
    const specialMphase = await SpecialMiniPhase.findOne({
      'miniPhase._id': req.params.mPhaseId,
    });

    if (specialMphase) {
      await specialMphase.remove();
      res.json({ message: 'Removed from Specials' });
    } else {
      const newSpecialMPhase = new SpecialMiniPhase({
        miniPhase,
      });
      const createdSpecialMphase = await newSpecialMPhase.save();

      res.status(201).json(createdSpecialMphase);
    }
  } else {
    res.status(404);
    throw new Error('Project MiniPhase not found');
  }
});

export {
  getMiniPhases,
  createMiniPhase,
  updateMiniPhase,
  deleteMiniPhase,
  getSpecialMphases,
  toogleSpecialMphase,
};
