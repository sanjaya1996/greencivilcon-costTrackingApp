import express from 'express';
import {
  createMaterial,
  deleteMaterial,
  getMaterials,
  updateMaterial,
} from '../controllers/materialController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getMaterials).post(checkAuth, createMaterial);
router
  .route('/:id')
  .put(checkAuth, updateMaterial)
  .delete(checkAuth, deleteMaterial);

export default router;
