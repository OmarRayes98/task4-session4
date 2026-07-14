import { Router } from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchUsersByEmail
} from '../controllers/user.controller';

const router = Router();

// Routes
router.post('/', createUser);
router.get('/', getAllUsers);

router.get('/search', searchUsersByEmail);

router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;