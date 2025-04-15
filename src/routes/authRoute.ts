import express from "express";
import authController from "../controllers/authController";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", userMiddleware.verifyToken, authController.logout);
router.post("/", authController.requestRefreshToken);

export default router;
