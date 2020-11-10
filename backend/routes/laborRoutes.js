import express from 'express';
import {
  createLabor,
  deleteLabor,
  getLabors,
  updateLabor,
} from '../controllers/laborController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getLabors).post(checkAuth, createLabor);
router.route('/:id').put(checkAuth, updateLabor).delete(checkAuth, deleteLabor);

export default router;
