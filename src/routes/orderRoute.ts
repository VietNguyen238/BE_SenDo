import express from "express";
import orderController from "../controllers/orderController";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get("/me", userMiddleware.verifyToken, orderController.getOrder);
router.get("/:id", userMiddleware.verifyToken, orderController.getIdOrder);
router.post("/add", userMiddleware.verifyToken, orderController.addOrder);
router.post(
  "/addMany",
  userMiddleware.verifyToken,
  orderController.addManyOrders
);
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
