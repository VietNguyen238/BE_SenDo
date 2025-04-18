import express from "express";
import orderController from "../controllers/orderController";

const router = express.Router();

router.get("/:userId", orderController.getOrder);
router.post("/", orderController.addOrder);
router.post("/update/:id", orderController.updateOrder);
router.delete("/delete/:id", orderController.deleteOrder);

export default router;
