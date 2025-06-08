import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import Review from "../models/review";
import Blog from "../models/blog";

const blogControllers = {
  getAllBlog: async (req: Request, res: Response) => {
    try {
      const blogs = await Blog.find();

      if (!blogs) {
        return res.status(404).json({ message: "No blogs found!" });
      }
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  getABlog: async (req: Request, res: Response) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found!" });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  addBlog: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const newBlog = new Blog(data);
      const savedBlog = await newBlog.save();

      res.status(201).json(savedBlog);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  updateBlog: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const updated = await Blog.findByIdAndUpdate(req.params.id, data);

      if (!updated) {
        return res.status(404).json({ message: "Blog not found!" });
      }

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  deleteBlog: async (req: Request, res: Response) => {
    try {
      const blogId = req.params.id;
      const deleted = await Blog.findByIdAndDelete(blogId);

      if (!deleted) {
        return res.status(404).json({ message: "Blog not found!" });
      }

      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
};

export default blogControllers;
