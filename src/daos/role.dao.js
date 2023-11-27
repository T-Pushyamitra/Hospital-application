import { ObjectId } from 'mongodb';
import { getPermissionNameById } from './permission.dao';

const RoleModel = require('../models/role.model');
const RolePermissionModel = require('../models/role_permission.model');

/**
 * Check if the role exists by id.
 *
 * @param {string} _role_id
 * @returns {boolean}
 */
exports._isRoleExists = async (_role_id) => {
  const role_count = await RoleModel.findOne()
    .where('_id')
    .equals(_role_id)
    .count();
  return !!role_count;
};

/**
 * Check if the role exists by name.
 *
 * @param {string} roleName
 * @returns {boolean}
 */
exports._isRoleNameExists = async (roleName) => {
  const role_count = await RoleModel.findOne()
    .where('roleName')
    .equals(roleName)
    .count();
  return !!role_count;
};

/**
 * Get all the roles from db.
 *
 * @returns {RoleModel}
 */
exports.index = async () => RoleModel.find();

/**
 * Get the role by role's name.
 *
 * @param {string} roleName
 * @returns {RoleModel}
 */
exports.getRoleByName = async (roleName) => {
  const role = await RoleModel.findOne().where('roleName').equals(roleName);
  return role;
};

/**
 * Get the role by role's id.
 *
 * @param {string} roleId
 * @returns {RoleModel}
 */
exports.getRoleById = async (roleId) => {
  const role = await RoleModel.findById(roleId);
  return role;
};

/**
 * Save a new role to db.
 *
 * @param {RoleModel} role
 * @returns {RoleModel}
 */
exports.create = async (role) => {
  const newRole = new RoleModel(role);
  await newRole.save();
  return newRole;
};

/**
 * Update the existing role by id.
 *
 * @param {string} _roleId
 * @param {string} _role
 * @returns {RoleModel}
 */
exports.update = async (_roleId, _role) => {
  await RoleModel.findByIdAndUpdate(_roleId, _role);
  const role = RoleModel.findById(_roleId);
  return role;
};

/**
 *  Add new permissions to the role.
 *
 * @param {RolePermissionModel} rolePermission
 * @returns {RolePermissionModel}
 */
exports.addPermissionsToRole = async (rolePermission) => {
  const newRolePermission = new RolePermissionModel(rolePermission);
  await newRolePermission.save();
  console.log(newRolePermission);
  return newRolePermission;
};

/**
 * Get all assigned permission from role id.
 * 
 * @param {string} _roleId 
 * @returns 
 */
exports.getPermissionsFromRole = async (_roleId) => {
  const roleObjectId = new ObjectId(_roleId);
  const rolePermissionIds = await RolePermissionModel.find({
    _roleId: roleObjectId,
  }).populate('_permissionId');

  const rolePermissions = rolePermissionIds.map(
    (permission) => permission._permissionId.permissionName,
  );

  return rolePermissions;
};
