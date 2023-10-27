import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  ratings: {
    type: Number,
    required: false,
  },
  reviewedOn: {
    type: Date,
    default: Date.now(),
  },
  rentalId: {
    type: String,
  },
});
const carAdddtionalInfoSchema = new mongoose.Schema({
  carModel: {
    type: String,
  },
  seats: {
    type: Number,
  },
  fuelType: {
    type: String,
  },
  gearType: {
    type: String,
  },
  averageMileage: {
    type: Number,
  },
  ac: {
    type: String,
  },
});
const carSchema = new mongoose.Schema({
  carId: {
    type: String,
  },
  userId: {
    type: String,
  },
  carName: {
    type: String,
  },
  carCategory: {
    type: String,
  },
  carPostedOn: {
    type: String,
  },
  carLastUpdatedOn: {
    type: String,
  },
  carReviews: [reviewSchema],
  carDescription: {
    type: String,
  },
  additionalInfo: carAdddtionalInfoSchema,
  carRent: {
    type: String,
  },
  carPhotos: [
    {
      type: String,
    },
  ],
  carNumber: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});
const carCollection = mongoose.model("cars", carSchema);
export default carCollection;
