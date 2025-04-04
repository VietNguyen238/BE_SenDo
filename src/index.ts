import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute";
import storeRoute from "./routes/storeRoute";
import productRoute from "./routes/productRoute";
import addressRoute from "./routes/addressRoute";

const app = express();

dotenv.config();

const port = process.env.PORT;
const URI = process.env.URI;

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/address", addressRoute);

mongoose.connect(URI || "", {});

app.listen(port || 4000, () => {
  console.log(`Listening on port ${port || 4000}`);
});
