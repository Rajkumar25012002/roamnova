import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  rentalId: {
    type: String,
  },
  rentedCarId: {
    type: String,
  },
  customerId: {
    type: String,
  },
  rentedOn: {
    type: Date,
  },
  totalDays: {
    type: Number,
  },
  pickUpDate:{
    type:String
  },
  dropDate:{
    type:String
  },
  rentalAmount: {
    type: String,
  },
  isDriver: {
    type: Boolean,
  },
  coupenCode: {
    type: String,
  }
});
const rentalCollection = mongoose.model("rentalhistory", rentalSchema);
export default rentalCollection;
