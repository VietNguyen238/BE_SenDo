import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
       type: String,
       require: true,
       unique: true,
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    description: {
        type: String,
        require: false,

    },
    isActive:{
        type: Boolean,
        default: false,
    },


},
{ timestamps: true}
)
const subCategory = mongoose.model("subCategory", subCategorySchema);
export default subCategory