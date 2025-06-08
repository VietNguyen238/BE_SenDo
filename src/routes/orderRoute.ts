import express, { RequestHandler } from "express";
import orderController from "../controllers/orderController";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get(
  "/",
  userMiddleware.verifyUserAndAdmin,
  orderController.getAllOrder as RequestHandler
);
router.get(
  "/me",
  userMiddleware.verifyToken,
  orderController.getOrder as RequestHandler
);
router.get(
  "/:id",
  userMiddleware.verifyToken,
  orderController.getIdOrder as RequestHandler
);
router.post(
  "/add",
  userMiddleware.verifyToken,
  orderController.addOrder as RequestHandler
);
router.post(
  "/addMany",
  userMiddleware.verifyToken,
  orderController.addManyOrders as RequestHandler
);
router.post(
  "/update/:id",
  userMiddleware.verifyToken,
  orderController.updateOrder as RequestHandler
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyToken,
  orderController.deleteOrder as RequestHandler
);

export default router;
