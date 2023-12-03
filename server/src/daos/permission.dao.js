const PermissionModel = require('../models/permission.model');

/**
 * Get all the permissions
 *
 * @returns {PermissionModel}
 */
exports.index = async () => {
  const permissions = PermissionModel.find();
  return permissions;
};

/**
 * Create a new permission
 *
 * @param {string} _permission
 * @returns {PermissionModel}
 */
exports.create = async (_permission) => {
  const permission = new PermissionModel(_permission);
  await permission.save();
  return permission;
};

/**\
 * Get the permission name from the permission id. 
 * 
 * @param {string} permissionId
 */
exports.getPermissionNameById = async (permissionId) => {
  const permission = await PermissionModel.findOne({
    _permissionId: permissionId,
  });
  return permission.permissionName;
};
