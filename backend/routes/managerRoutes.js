import express from 'express';
import {
  createManager,
  deleteManager,
  getManagers,
  getMyManagers,
  updateManager,
} from '../controllers/managerController.js';

import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getManagers).post(checkAuth, createManager);
router.route('/mymanagers').get(checkAuth, getMyManagers);
router
  .route('/:id')
  .put(checkAuth, updateManager)
  .delete(checkAuth, deleteManager);

export default router;
