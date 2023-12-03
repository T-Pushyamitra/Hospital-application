import { index, create, update } from '../daos/permission.dao';

/**
 * Get all the permissions
 *
 * @returns {PermissionModel}
 */
exports.getPermissions = async () => index();

/**
 * Save new permission
 *
 * @param {PermissionModel} permission
 * @returns {PermissionModel}
 */
exports.createPermission = async (permission) => {
  permission.permissionName = permission.permissionName.trim().toUpperCase(); // Remove trailing spaces and change it to upper case.

  // const errors = validatePermission(permission);

  // if (errors && errors.length) {
  //   throw new Error(errors);
  // }
  return create({ ...permission });
};

/**
 * Update the existing permission by id.
 *
 * @param {string} id
 * @param {string} permission
 * @returns
 */
exports.updatePermission = async (id, permission) => {
  permission.permissionName = permission.permissionName.trim().toUpperCase(); // Remove trailing spaces and change it to upper case.

  //   const errors = await validatePermission(permission);

  //   if (errors && errors.length) {
  //     throw new Error(errors);
  //   }

  return update(id, permission);
};
