import express from "express";
import {
  getAdmins,
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
router.get("/roles/:name", authorizeRole(["admin"]), getRolePermissions);
router.post("/roles/:name", authorizeRole(["admin"]), updateRolePermissions);

export default router;
