import express from "express";
import { createUser, logInUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", logInUser);

export default router;
