import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
} from '../controllers/userController.js';

// Route for registering a new user
router.post('/', registerUser);

// Route for authenticating a user (login)
router.post('/login', authUser);

export default router;