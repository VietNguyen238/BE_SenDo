import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        image:{
            type: String,
        },
        comment:{
            type: String,

        },
        rating:{
            type: Number,
            default: 4,
        },

    },  { timestamps: true }

)

const Review = mongoose.model("Review", reviewSchema);

export default Review;