import express from 'express';

import {
  getProjectPhases,
  createProjectPhase,
  updateProjectPhase,
  deleteProjectPhase,
} from '../controllers/projectPhaseController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProjectPhases).post(checkAuth, createProjectPhase);
router
  .route('/:id')
  .put(checkAuth, updateProjectPhase)
  .delete(checkAuth, deleteProjectPhase);

export default router;
