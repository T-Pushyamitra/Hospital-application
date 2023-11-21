import { _isRoleNameExists } from '../daos/role.dao';

exports.validateRole = (role) => {
  if (!role) {
    return ['role is required'];
  }

  const roleExists = _isRoleNameExists(role.roleName);

  if (!roleExists) {
    return [`Role ${role.roleName} already exsits`];
  }

  if (!role.roleName) {
    return ['Role name is required'];
  }

  if (role.roleName.length < 3) {
    return ['Role name should be minimum of 3 chars.'];
  }

  if (role.roleName.length > 20) {
    return ['Role name should be maximum of 20 chars.'];
  }
};
