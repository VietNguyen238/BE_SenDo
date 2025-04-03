import express from "express";
import userControllers from "../controllers/user";
import upload from "../middlewares/multer";

const router = express.Router();

router.get("/", userControllers.getAllUser);
router.get("/:id", userControllers.getAUser);
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.post("/update/:id", upload.single("avatar"), userControllers.updateUser);
router.delete("/delete/:id", userControllers.deleteUser);

export default router;
