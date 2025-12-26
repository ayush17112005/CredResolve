import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

const router = Router();
const controller = new UserController();

// POST /api/users - Create user
router.post('/', controller.createUser.bind(controller));

// GET /api/users/: id - Get user by ID
router.get('/:id', controller.getUser.bind(controller));

export default router;