import cartController from "../controllers/cartController";
import express, { RequestHandler } from "express";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get(
  "/",
  userMiddleware.verifyUserAndAdmin,
  cartController.getAllCart as RequestHandler
);
router.get(
  "/me",
  userMiddleware.verifyToken,
  cartController.getCart as RequestHandler
);
router.post("/add", userMiddleware.verifyToken, cartController.addCart);
router.post(
  "/update/:id",
  userMiddleware.verifyToken,
  cartController.updateCart
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyToken,
  cartController.deleteCart
);

export default router;
