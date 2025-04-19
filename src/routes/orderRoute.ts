import express from "express";
import orderController from "../controllers/orderController";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get(
  "/:userId",
  userMiddleware.verifyUserAndAdmin,
  orderController.getOrder
);
router.post("/add", userMiddleware.verifyToken, orderController.addOrder);
router.post(
  "/update/:id",
  userMiddleware.verifyToken,
  orderController.updateOrder
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyToken,
  orderController.deleteOrder
);

export default router;
