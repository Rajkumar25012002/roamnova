import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
  },
  couponType: {
    type: String,
  },
  couponFor: [
    {
      type: String,
    },
  ],
  couponDescription: {
    type: String,
  },
  couponLimit: {
    type: Number,
  },
  startingDate: {
    type: Date,
  },
  expiryDate: {
    type: Date,
  },
  offerPercentage: {
    type: Number,
  },
  couponBy: {
    type: String,
  },
  lastModifiedOn: {
    type: Date,
  },
  createdOn: {
    type: Date,
  },
});
const adminSchema = new mongoose.Schema({
  hostRequests: [
    {
      requestId: {
        type: String,
      },
      userId: {
        type: String,
      },
      requestedOn: {
        type: Date,
      },
      status: {
        type: String,
        default: "Pending",
      },
      reasonForDecline: {
        type: String,
      },
    },
  ],
  coupons: [couponSchema],
});
const adminCollection = mongoose.model("admin", adminSchema);
export default adminCollection;
