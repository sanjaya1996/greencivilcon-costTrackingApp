import express from 'express';

import checkAuth from '../middleware/authMiddleware.js';
import {
  getMiniPhases,
  createMiniPhase,
  updateMiniPhase,
  deleteMiniPhase,
} from '../controllers/miniPhaseController.js';

const router = express.Router();

router.route('/').get(getMiniPhases).post(checkAuth, createMiniPhase);
router
  .route('/:id')
  .delete(checkAuth, deleteMiniPhase)
  .put(checkAuth, updateMiniPhase);

export default router;
