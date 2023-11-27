const jwt = require('jsonwebtoken');
const { getPermissionsFromRole } = require('../daos/role.dao');
const { getUserById } = require('../daos/user.dao');
const UserModel = require('../models/user.model');

const config = process.env;

/**
 * Check if the user is logged in.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.auth = (req, res, next) => {
  // Can pass token from body, as query or in headers
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  // send status 403
  if (!token) {
    console.warn('Token is required for authentication');
    return res
      .status(403)
      .send({ error: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.error('Authentication was not successfull');
    return res.status(401).send({ error: 'Invalid Token' });
  }

  console.log('Authentication was successfull');
  return next();
};

/**
 *
 * Check if passed permitted roles are assigned to user's role.
 *
 * @param {*} permittedRoles
 * @returns
 */
 exports.permit =
 (permittedRoles) =>
   // return a middleware
   async (request, response, next) => {
     // Get the user from the previous req
     const { user } = request;

     const _user = await getUserById(user.user_id.valueOf());
     const _userPermissions = await getPermissionsFromRole(
       _user.role._id.valueOf(),
     );

     const _hasPermission = permittedRoles.find(
       (permittedRole) => _userPermissions.indexOf(permittedRole) !== -1,
     );

     if (user && _hasPermission) {
       next(); // role is allowed, so continue on the next middleware
     } else {
       response.status(403).json({
         message: `Forbidden youd don't have permission ${_hasPermission}`,
       }); // user is forbidden
     }
   };