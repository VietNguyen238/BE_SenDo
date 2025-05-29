import express, { RequestHandler } from "express";
import paymentController from "../controllers/paymentController";

const router = express.Router();

router.get("/create_payment", paymentController.addPayment as RequestHandler);
router.get("/check_payment", paymentController.getPayment as RequestHandler);

export default router;
