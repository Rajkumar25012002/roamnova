import mongoose from "mongoose";
import ROLE from "../Roles.js";

const incomeSchema = new mongoose.Schema({
  amount: {
    type: String,
  },
  customerId: {
    type: String,
  },
  paidOn: {
    type: Date,
  },
});

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  fullName: {
    type: String,
  },
  userName: {
    type: String,
  },
  gender: {
    type: String,
  },
  userProfilePic: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  savedCars: [
    {
      type: String,
    },
  ],
  userRole: {
    type: String,
    default: ROLE.USER,
  },
  income: [incomeSchema],
  refreshToken: {
    type: String,
  },
  city: {
    type: String,
  },
  registerReferralId: {
    type: String,
  },
  userReferralId:{type:String},
  resetPasswordTokenExpires: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});
const userCollection = mongoose.model("users", userSchema);
export default userCollection;
