import { Router } from 'express';

import { getUserListByRoleId, getUsersList, updateUser } from '../controllers/user.controller';
import { auth, permit } from '../middleware/auth.middleware';

const router = Router();

router.route('/').get(getUsersList);
router.route('/:id').post(updateUser);
router.route('/role/:roleId').get(getUserListByRoleId);

export default router;
