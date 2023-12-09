import { verify } from "jsonwebtoken";
import { getPermissionsFromRole } from "../daos/role.dao";
import { getUserById } from "../daos/user.dao";

const config = process.env;

/**
 * Check if the user is logged in.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export function auth(req, res, next) {
  // Get the token from the request
  const token = req.cookies.token;

  // Token was not found
  if (!token) {
    console.warn("Token is required for authentication");
    return res
      .status(403)
      .send({ error: "A token is required for authentication" });
  }

  // Verify the token
  try {
    const decoded = verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.error("Authentication was not successfull");
    return res.status(401).send({ error: "Invalid Token" });
  }

  console.log("Authentication was successfull");
  return next();
}

/**
 *
 * Check if passed permitted roles are assigned to user's role.
 *
 * @param {*} permittedRoles
 * @returns
 */
export function permit(permittedRoles) {
  // return a middleware
  return async (request, response, next) => {
    // Get the user from the previous req
    const { user } = request;

    // Get the user object
    const _user = await getUserById(user.user_id);
    
    // Get the user's role and its permissions
    const _userPermissions = await getPermissionsFromRole(
      _user.role._id.valueOf()
    );
    
    // Permissions from the params are persent in user's role.
    const _hasPermission = permittedRoles.find(
      (permittedRole) => _userPermissions.indexOf(permittedRole) !== -1
    );

    if (user && _hasPermission) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      response.status(403).json({
        message: `Forbidden youd don't have permission ${_hasPermission}`,
      }); // user is forbidden
    }
  };
}
