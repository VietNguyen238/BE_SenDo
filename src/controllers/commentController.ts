import { Request, Response } from "express";
import Comment from "../models/comment";
import Product from "../models/product";
import User from "../models/user";

const commentController = {
  addComment: async (req: Request, res: Response) => {
    try {
      const newComment = new Comment(req.body);
      const saveComment = await newComment.save();

      if (saveComment.productId) {
        await Product.updateOne(
          { _id: saveComment.productId },
          {
            $push: { commentId: saveComment._id },
          }
        );
      }

      if (saveComment.userId) {
        await User.updateOne(
          { _id: saveComment.userId },
          {
            $push: { commentId: saveComment._id },
          }
        );
      }

      res.status(201).json(saveComment);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getAllComment: async (req: Request, res: Response) => {
    try {
      const comment = await Comment.find();

      if (!comment) {
        throw new Error("Comment not found!");
      }

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getAComment: async (req: Request, res: Response) => {
    try {
      const comment = await Comment.findById(req.params.id);

      if (!comment) {
        throw new Error("Comment not found!");
      }

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateComment: async (req: Request, res: Response) => {
    try {
      await Comment.findByIdAndUpdate(req.params.id, req.body);

      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteComment: async (req: Request, res: Response) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);

      await Product.updateMany(
        { commentId: req.params.id },
        { $pull: { commentId: req.params.id } }
      );

      await User.updateMany(
        { commentId: req.params.id },
        { $pull: { commentId: req.params.id } }
      );

      res.status(500).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default commentController;
