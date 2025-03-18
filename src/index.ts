import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

dotenv.config();

const port = process.env.PORT;
const URI = process.env.URI;

app.use(cors());
app.use(express.json());

mongoose.connect(URI || "", {});

app.listen(port || 3000, () => {
  console.log(`Listening on port ${port || 3000}`);
});
