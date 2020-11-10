import asyncHandler from 'express-async-handler';
import Material from '../models/material.js';

const getMaterials = asyncHandler(async (req, res) => {
  const materials = await Material.find({});

  res.json(materials);
});

const createMaterial = asyncHandler(async (req, res) => {
  const {
    mPhaseId,
    projectPhaseId,
    materialName,
    quantityUsed,
    rate,
    totalCost,
    description,
  } = req.body;

  const material = new Material({
    name: materialName,
    description,
    rate,
    quantityUsed,
    totalCost,
    miniPhase: mPhaseId,
    projectPhase: projectPhaseId,
  });
  const createdMaterial = await material.save();

  res.status(201).json(createdMaterial);
});

const updateMaterial = asyncHandler(async (req, res) => {
  const { materialName, quantityUsed, rate, totalCost, description } = req.body;

  const material = await Material.findById(req.params.id);

  if (material) {
    material.name = materialName || material.name;
    material.description = description || material.description;
    material.rate = rate || material.rate;
    material.quantityUsed = quantityUsed || material.quantityUsed;
    material.totalCost = totalCost || material.totalCost;

    const updatedMaterial = await material.save();

    res.json(updatedMaterial);
  } else {
    res.status(404);
    throw new Error('Material not found');
  }
});

const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

  if (material) {
    await material.remove();

    res.json({ message: 'Material Deleted' });
  } else {
    res.status(404);
    throw new Error('Material not found');
  }
});

export { getMaterials, createMaterial, updateMaterial, deleteMaterial };
