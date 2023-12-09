import { Router } from 'express';

import { getUserListByRoleId, getUsersList, updateUser } from '../controllers/user.controller';
import { auth, permit } from '../middleware/auth.middleware';

const router = Router();

router.route('/').get(auth, getUsersList);
router.route('/:id').post(auth, updateUser);
router.route('/role/:roleId').get(auth, permit(["CAN_READ_ROLE"]), getUserListByRoleId);


export default router;
