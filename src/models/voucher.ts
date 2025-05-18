import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    voucherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voucher",
    },
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
{ timestamp: true });

const Voucher = mongoose.model("Voucher", voucherSchema);

export default Voucher;
