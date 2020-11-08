import express from 'express';
import { getProjects } from '../controllers/projectController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProjects);

export default router;
