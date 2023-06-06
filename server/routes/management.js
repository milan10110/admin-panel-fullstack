import express from "express";
import {
  createNewRole,
  getAdmins,
  getAvailablePermissions,
  getRoleList,
  getRolePermissions,
  getUserPerformance,
  updateRolePermissions,
} from "../controllers/management.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

router.get("/admins", authorizeRole(["admin"]), getAdmins);
router.get("/performance/:id", getUserPerformance);
router.get("/roles", authorizeRole(["admin"]), getRoleList);
router.post("/roles", authorizeRole(["admin"]), createNewRole);
router.get("/roles/:name", authorizeRole(["admin"]), getRolePermissions);
router.post("/roles/:name", authorizeRole(["admin"]), updateRolePermissions);
router.get(
  "/availablepermissions",
  authorizeRole(["admin"]),
  getAvailablePermissions
);

export default router;
