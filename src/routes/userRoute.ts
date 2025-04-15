import express from "express";
import userControllers from "../controllers/userController";
import upload from "../middlewares/multer";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.get("/", userMiddleware.verifyUserAndAdmin, userControllers.getAllUser);
router.get("/:id", userMiddleware.verifyUserAndAdmin, userControllers.getAUser);
router.post(
  "/update/:id",
  userMiddleware.verifyToken,
  upload.single("avatar"),
  userControllers.updateUser
);
router.delete(
  "/delete/:id",
  userMiddleware.verifyUserAndAdmin,
  userControllers.deleteUser
);

export default router;
