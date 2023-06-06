function authorizeRole(requiredRoles) {
  return async (req, res, next) => {
    try {
      const userRoles = req.user.role;

      // some() returns a boolean with or logic
      const hasRequiredRole = requiredRoles.some((requiredRole) =>
        userRoles.includes(requiredRole)
      );

      if (hasRequiredRole) {
        return next();
      }

      return res.status(403).json({ message: "Unauthorized" });
    } catch (error) {
      console.error("Authorization error: ", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

export default authorizeRole;
