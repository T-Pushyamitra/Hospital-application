import { Router } from 'express';

import { getRolesList, createNewRole, updateRole, addPermissionsToRole } from '../controllers/role.controller';
import { auth, permit } from '../auth/auth.middleware';

const {
  getRolesList,
  createNewRole,
  updateRole,
  addPermissionsToRole,
} = require('../controllers/role.controller');

const router = Router();

router.route('/').get(auth, permit(["CAN_READ_ROLE"]), getRolesList).post(auth, permit(["CAN_READ_ROLE", "CAN_ADD_ROLE"]), createNewRole);
router.route('/role_permission').post(auth, permit(["CAN_READ_ROLE", "CAN_READ_PREMISSION", "CAN_ADD_ROLE", "CAN_ADD_PREMISSION"]), addPermissionsToRole);
router.route('/:id').post(auth, permit(["CAN_READ_ROLE", "CAN_UPDATE_ROLE"]), updateRole);

export default router;
