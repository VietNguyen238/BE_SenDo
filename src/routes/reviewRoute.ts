import express from "express";
import reviewController from "../controllers/reviewController";
import userMiddleware from "../middlewares/userMiddleware";

const router = express.Router()

router.get("/:id", userMiddleware.verifyUserAndAdmin, reviewController.getReviews)
router.get("/add", userMiddleware.verifyUserAndAdmin, reviewController.addReview)

export default router;