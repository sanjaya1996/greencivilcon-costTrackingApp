import express from 'express';
import {
  createMiscellany,
  deleteMiscellany,
  getMiscellanies,
  updateMiscellany,
} from '../controllers/miscellanyController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getMiscellanies).post(checkAuth, createMiscellany);
router
  .route('/:id')
  .put(checkAuth, updateMiscellany)
  .delete(checkAuth, deleteMiscellany);

export default router;
