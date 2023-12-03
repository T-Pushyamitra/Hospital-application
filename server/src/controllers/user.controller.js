const {
  getUsers,
  getUserByPhoneNumber,
  getUsersByRoleId,
  updateUser,
} = require('../services/user.service');

/**
 * Get all the users list.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getUsersList = async (req, res) => {
  try {
    const users = await getUsers();

    const totalUsers = users?.length || 0;
    return res.json({
      message: `Found total ${totalUsers} users`,
      data: users,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get user by phone number.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getUserListByPhoneNumber = async (req, res) => {
  const users = await getUserByPhoneNumber(req.params.phoneNumber);
  return res
    .status(200)
    .json({ message: `Found total ${users?.length || 0} users`, data: users });
};

/**
 * Update the user.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get the users list by role id.
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getUserListByRoleId = async (req, res) => {
  try {
    const { roleId } = req.params;
    const users = await getUsersByRoleId(roleId);
    return res
      .status(200)
      .json({ message: 'Found all the users', data: users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
