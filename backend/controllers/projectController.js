import asyncHandler from 'express-async-handler';

import { Project } from '../models/project.js';
import { HISTORY_PROJECTS } from '../data/projects.js';

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
});

const getHistoryProjects = (req, res) => {
  res.json(HISTORY_PROJECTS);
};

export { getProjects, getHistoryProjects };
