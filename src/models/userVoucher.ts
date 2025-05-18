import mongoose from "mongoose";

const userVoucherSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    voucherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voucher",
        required: true,
    },
    redeemedAt:{
        type: Datetime,
        required: true,
    },
    isUsed:{
        type: Boolean,
        default: false,
    },
    useAt?:{
        type: Datetime,
        required: true,
    },

},
{
    timestamps: true
});
const userVoucher = mongoose.model("userVoucher", userVoucherSchema)

export default userVoucher;