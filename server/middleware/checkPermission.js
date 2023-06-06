import Permission from "../models/Permission.js";
import Role from "../models/Role.js";

async function checkPermission(userRole, requiredPermission) {
  try {
    const role = await Role.findOne({ name: userRole }).populate("permissions");
    const requiredPermissionId = (
      await Permission.findOne({ name: requiredPermission })
    )._id.toString();

    if (role) {
      const permissionIds = role.permissions.map((permission) =>
        permission._id.toString()
      );

      return permissionIds.includes(requiredPermissionId);
    }

    return false;
  } catch (error) {
    console.error("Error while chceking permission: ", error);
    return false;
  }
}

export default checkPermission;
