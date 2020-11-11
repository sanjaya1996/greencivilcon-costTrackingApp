import express from 'express';
import {
  createClient,
  deleteClient,
  getClients,
  getMyClients,
  updateClient,
} from '../controllers/ClientController.js';

import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getClients).post(checkAuth, createClient);
router.route('/myclients').get(checkAuth, getMyClients);
router
  .route('/:id')
  .put(checkAuth, updateClient)
  .delete(checkAuth, deleteClient);

export default router;
