import express from 'express';
import {
  createUserNote,
  deleteUserNote,
  getMyUserNotes,
  getUserNotes,
  updateUserNote,
} from '../controllers/userNoteController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getUserNotes).post(checkAuth, createUserNote);
router.route('/mynotes').get(checkAuth, getMyUserNotes);
router
  .route('/:id')
  .put(checkAuth, updateUserNote)
  .delete(checkAuth, deleteUserNote);

export default router;
