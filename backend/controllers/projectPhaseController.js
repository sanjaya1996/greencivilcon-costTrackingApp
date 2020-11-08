import asyncHandler from 'express-async-handler';

import ProjectPhase from '../models/projectPhase.js';

const getProjectPhases = asyncHandler(async (req, res) => {
  const projectPhases = await ProjectPhase.find({});
  res.json(projectPhases);
});

const createProjectPhase = asyncHandler(async (req, res) => {
  const {
    projectId,
    title,
    startedDate,
    estimatedDate,
    estimatedBudget,
  } = req.body;

  const projectPhase = new ProjectPhase({
    project: projectId,
    title,
    startedDate,
    estimatedDate,
    estimatedBudget,
  });

  const createdProjectPhase = await projectPhase.save();

  res.status(201).json(createdProjectPhase);
});

export { getProjectPhases, createProjectPhase };
