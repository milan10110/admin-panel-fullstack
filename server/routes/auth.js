import express from "express";
import {
  createUser,
  logInUser,
  logOutUser,
  reLogInUser,
} from "../controllers/auth.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", logInUser);
router.get("/relogin", verifyToken, reLogInUser);
router.post("/logout", logOutUser);

export default router;
