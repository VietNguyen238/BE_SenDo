import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import addressRoute from "./routes/addressRoute";
import chatRoute from "./routes/chatRoute";
import authRoute from "./routes/authRoute";
import messageRoute from "./routes/messageRoute";
import orderRoute from "./routes/orderRoute";
import categoryRoute from "./routes/categoryRoute";
import reviewRoute from "./routes/reviewRoute";
import paymentRoute from "./routes/paymentRoute";
import cartRoute from "./routes/cartRoute";
import blogRoute from "./routes/blogRoute";

const app = express();

dotenv.config();

const port = process.env.PORT;
const URI = process.env.URI;

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/payment", paymentRoute);

mongoose.connect(URI || "", {});

app.listen(port || 4000, () => {
  console.log(`Listening on port ${port || 4000}`);
});
