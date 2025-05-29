import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({

    voucherName:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    discountAmount:{
        type: Number,
        required: true,
    },
    requiredPoints:{
        type: Number,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },

},
{ timestamps: true }
);

const Voucher = mongoose.model("Voucher", voucherSchema);

export default Voucher;
