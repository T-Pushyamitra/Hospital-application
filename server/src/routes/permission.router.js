import { Router } from 'express';

import { getPermissionsList, createNewPermission, updatePermission } from '../controllers/permission.controller';
import { auth, permit } from '../auth/auth.middleware';

const router = Router();

router.route('/').get(auth, permit(["CAN_READ_PREMISSION"]), getPermissionsList).post(auth, permit(["CAN_READ_PREMISSION", "CAN_ADD_PREMISSION"]), createNewPermission);
router.route('/:id').post(auth, permit(["CAN_READ_PREMISSION", "CAN_UPDATE_PERMISSIONS"]), updatePermission);

export default router;
