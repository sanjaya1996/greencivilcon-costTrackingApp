import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import {
  createProject,
  finishProject,
  getHistoryProjects,
  getMyHistoryProjects,
  getProjects,
  updateProject,
  deleteHistoryProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.route('/').get(getProjects).post(checkAuth, createProject);
router
  .route('/:id')
  .delete(checkAuth, finishProject)
  .put(checkAuth, updateProject);

//history projects
router.get('/history', getHistoryProjects);
router.route('/history/my').get(checkAuth, getMyHistoryProjects);
router.route('/history/:id').delete(checkAuth, deleteHistoryProject);

export default router;
