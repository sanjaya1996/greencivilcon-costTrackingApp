import express from 'express';

import checkAuth from '../middleware/authMiddleware.js';
import {
  getMiniPhases,
  createMiniPhase,
  updateMiniPhase,
  deleteMiniPhase,
  toogleSpecialMphase,
  getSpecialMphases,
} from '../controllers/miniPhaseController.js';

const router = express.Router();

router.route('/').get(getMiniPhases).post(checkAuth, createMiniPhase);
router
  .route('/:id')
  .delete(checkAuth, deleteMiniPhase)
  .put(checkAuth, updateMiniPhase);
router.get('/specials', getSpecialMphases);
router.route('/specials/:mPhaseId').get(checkAuth, toogleSpecialMphase);

export default router;
