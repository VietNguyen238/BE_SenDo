import express from "express";
import userControllers from "../controllers/user";

const router = express.Router();

router.get("/", userControllers.getAllUser);
router.get("/:id", userControllers.getAUser);
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.post("/update/:id", userControllers.updateUser);
router.delete("/delete/:id", userControllers.deleteUser);

export default router;
