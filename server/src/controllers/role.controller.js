import {
  createRole,
  updateRole,
  getRoles,
  addPermissionsToRole,
} from '../services/role.service';

/**
 * Get all the roles
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getRolesList = async (req, res) => {
  try {
    const roles = await getRoles();
    return res.json({
      message: 'Found all the roles',
      data: roles,
      status: 200,
    });
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
};

/**
 * Create a new role
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.createNewRole = async (req, res) => {
  try {
    const role = await createRole(req.body);
    return res.json({
      message: `Created role ${role.roleName} successfully`,
      data: role,
      status: 201,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message, status: 500 });
  }
};

/**
 * Update a role
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await updateRole(id, req.body);
    return res.json({
      message: `Update role '${role.roleName}' successfully`,
      data: role,
      status: 200,
    });
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
};

exports.addPermissionsToRole = async (req, res) => {
  try {
    const rolePermission = req.body;
    await addPermissionsToRole(rolePermission);
    return res.json({
      message: `Permission added to role successfully`,
      status: 200,
    });
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
};
