import { Router } from "express";
import * as transactionController from "../controllers/transactionController";

const router = Router();

router.get("/", transactionController.getTransactions);
router.get("/:id", transactionController.getTransactionById);
router.post("/", transactionController.createTransaction);
router.patch("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

export default router;      
