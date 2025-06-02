import express, { RequestHandler } from "express";
import authController from "../controllers/authController";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router();

router.post("/register", authController.register as RequestHandler);
router.post("/login", authController.login);
router.post("/login-google", authController.loginGoogle);
router.post("/logout", authController.logout);
router.post("/", authController.requestRefreshToken);

export default router;
