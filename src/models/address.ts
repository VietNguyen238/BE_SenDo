import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  district: {
    type: String,
  },
  commune: {
    type: String,
  },
  city: {
    type: String,
  },
});

const Address = mongoose.model("Address", addressSchema);
export default Address;
