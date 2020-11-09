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

const updateProjectPhase = asyncHandler(async (req, res) => {
  const { startedDate, estimatedDate, estimatedBudget } = req.body;
  const projectPhase = await ProjectPhase.findById(req.params.id);

  if (projectPhase) {
    projectPhase.startedDate = startedDate || projectPhase.startedDate;
    projectPhase.estimatedDate = estimatedDate || projectPhase.estimatedDate;
    projectPhase.estimatedBudget =
      estimatedBudget || projectPhase.estimatedBudget;

    const updatedProjectPhase = await projectPhase.save();

    res.json(updatedProjectPhase);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

const deleteProjectPhase = asyncHandler(async (req, res) => {
  const projectPhase = await ProjectPhase.findById(req.params.id);

  if (projectPhase) {
    await projectPhase.remove();
    res.json({ message: 'Project Phase Deleted' });
  } else {
    res.status(404);
    throw new Error('Project Phase not found');
  }
});

export {
  getProjectPhases,
  createProjectPhase,
  updateProjectPhase,
  deleteProjectPhase,
};
