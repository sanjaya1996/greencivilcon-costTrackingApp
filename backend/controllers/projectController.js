import asyncHandler from 'express-async-handler';

import { HistoryProject, Project } from '../models/project.js';
import ProjectPhase from '../models/projectPhase.js';

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
});

const getHistoryProjects = asyncHandler(async (req, res) => {
  const historyProjects = await HistoryProject.find({});
  res.json(historyProjects);
});

const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    address,
    startedDate,
    estimatedDate,
    estimatedBudget,
  } = req.body;

  const projectExisted = await Project.findOne({ supervisor: req.user._id });

  if (!projectExisted) {
    const project = new Project({
      title,
      address,
      startedDate,
      estimatedDate,
      estimatedBudget,
      supervisor: req.user._id,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject); //Creation of a resource - 201
  } else {
    res.status(409);
    throw new Error('Project already exist');
  }
});

const finishProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    // Add to History
    const historyProject = new HistoryProject({ finishedProject: project });
    const createdHistoryProject = await historyProject.save();

    // Remove as Current Project
    await project.remove();
    res.json({
      message: 'Project moved to history',
      data: createdHistoryProject,
    });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

const getMyHistoryProjects = asyncHandler(async (req, res) => {
  const myHistoryProjects = await HistoryProject.find({
    'finishedProject.supervisor': req.user._id,
  });
  res.json(myHistoryProjects);
});

const updateProject = asyncHandler(async (req, res) => {
  const {
    title,
    address,
    startedDate,
    estimatedDate,
    estimatedBudget,
  } = req.body;
  const project = await Project.findById(req.params.id);

  if (project) {
    project.title = title || project.title;
    project.address = address || project.address;
    project.startedDate = startedDate || project.startedDate;
    project.estimatedDate = estimatedDate || project.estimatedDate;
    project.estimatedBudget = estimatedBudget || project.estimatedBudget;

    const updatedProject = await project.save();

    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

const deleteHistoryProject = asyncHandler(async (req, res) => {
  const historyProject = await HistoryProject.findById(req.params.id);

  if (historyProject) {
    const projecId = historyProject.finishedProject._id;
    await ProjectPhase.deleteMany({ project: projecId });

    await historyProject.remove();
    res.json({ message: 'History Project with Phases deleted' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

export {
  getProjects,
  getHistoryProjects,
  getMyHistoryProjects,
  createProject,
  finishProject,
  updateProject,
  deleteHistoryProject,
};
