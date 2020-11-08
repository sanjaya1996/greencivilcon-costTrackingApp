import express from 'express';
import { getHistoryProjects } from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getHistoryProjects);

export default router;
