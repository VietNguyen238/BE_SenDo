import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
