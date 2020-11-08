import express from 'express';

import {
  getProjectPhases,
  createProjectPhase,
} from '../controllers/projectPhaseController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProjectPhases).post(checkAuth, createProjectPhase);

export default router;
