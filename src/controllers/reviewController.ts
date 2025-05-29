import { Request, Response } from "express";
import Review from "../models/review";
import Product from "../models/product";

const reviewController = {
  addReview: async (req: Request, res: Response) => {
    try {
      const { productId, rating, comment, images } = req.body;
      const userId = (req as any).user._id;
      const existed = await Review.findOne({userId, productId});
      if (existed) {
        res.status(400).json({message : "Bạn đã đánh giá sản phẩm này rồi! "});
        return;
      }
      if (!productId || !rating){
        res.status(400).json({ message: "Thiếu productId hoặc rating!"})
        return;
      }
      const newReview = new Review({
        userId,
        productId,
        rating,
        comment,
        images,
      });
      const saved = await newReview.save();
      res.status(201).json(saved);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getReviews: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const reviews = await Review.find({ productId })
        .populate("userId", "name")
        .sort({ createdAt: -1 });

      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default reviewController;
