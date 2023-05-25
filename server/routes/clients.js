import express from "express";
import {
  getCustomers,
  getProducts,
  getTransactions,
} from "../controllers/clients.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);

export default router;
