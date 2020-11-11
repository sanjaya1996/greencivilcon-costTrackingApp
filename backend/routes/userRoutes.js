import express from 'express';

import {
  authUser,
  createUserProfile,
  getMyProfile,
  getUserProfiles,
  getUsers,
  signUpUser,
  updateUserProfile,
} from '../controllers/userController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getUsers).post(signUpUser);
router.post('/login', authUser);

// ***USER PROFILE ***
router
  .route('/profiles')
  .get(getUserProfiles)
  .post(checkAuth, createUserProfile);
router.get('/profiles/myprofile', checkAuth, getMyProfile);
router.route('/profiles/:id').put(checkAuth, updateUserProfile);

export default router;
