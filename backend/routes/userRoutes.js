import express from 'express';

import {
  authUser,
  getUsers,
  signUpUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getUsers).post(signUpUser);
router.post('/login', authUser);

export default router;
