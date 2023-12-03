import {
  createPermission,
  updatePermission,
  getPermissions,
} from '../services/permission.service';

/**
 * Get all the permissions
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getPermissionsList = async (req, res) => {
  try {
    const permissions = await getPermissions();
    return res.json({
      message: 'Found all the permissions',
      data: permissions,
      status: 200,
    });
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
};

/**
 * Create a new permission
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.createNewPermission = async (req, res) => {
  try {
    const permission = await createPermission(req.body);
    return res.json({
      message: `Created permission ${permission.permissionName} successfully`,
      data: permission,
      status: 201,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message, status: 500 });
  }
};

/**
 * Update a permission
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await updatePermission(id, req.body);
    return res.json({
      message: `Update permission '${permission.permissionName}' successfully`,
      data: permission,
      status: 200,
    });
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
};
