import {
  index,
  create,
  update,
  _isRoleNameExists,
  _isRoleExists,
  addPermissionsToRole,
} from '../daos/role.dao';
import { validateRole } from '../validators/role.validate';

/**
 * Get all the roles
 *
 * @returns {RoleModel}
 */
exports.getRoles = async () => index();

/**
 * Save new role
 *
 * @param {RoleModel} role
 * @returns {RoleModel}
 */
exports.createRole = async (role) => {
  role.roleName = role.roleName.trim().toUpperCase(); // Remove trailing spaces and change it to upper case.

  const errors = validateRole(role);

  if (errors && errors.length) {
    throw new Error(errors);
  }
  return create({ ...role });
};

/**
 * Update the existing role by id.
 *
 * @param {string} id
 * @param {string} role
 * @returns
 */
exports.updateRole = async (id, role) => {
  role.roleName = role.roleName.trim().toUpperCase(); // Remove trailing spaces and change it to upper case.

  const errors = await validateRole(role);

  if (errors && errors.length) {
    throw new Error(errors);
  }

  return update(id, role);
};

exports.addPermissionsToRole = async (rolePermission) =>
  addPermissionsToRole(rolePermission);
