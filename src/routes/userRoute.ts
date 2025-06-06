import express, { RequestHandler } from "express";
import userControllers from "../controllers/userController";
import upload from "../middlewares/multer";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get("/", userMiddleware.verifyUserAndAdmin, userControllers.getAllUser);
router.get("/me", userMiddleware.verifyToken, userControllers.getAUser);
router.post(
  "/update/me",
  userMiddleware.verifyToken,
  upload.single("avatar"),
  userControllers.updateUser as RequestHandler
);
router.delete(
  "/delete/me",
  userMiddleware.verifyUserAndAdmin,
  userControllers.deleteUser
);

export default router;
