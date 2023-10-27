import { nanoid } from "nanoid";
import adminCollection from "../Model/AdminModel.js";
import userCollection from "../Model/UserModel.js";
import ROLE from "../Roles.js";
export const addCoupen = async (req, res) => {
  const {
    couponCode,
    couponType,
    couponFor,
    couponDescription,
    couponLimit,
    startingDate,
    expiryDate,
    offerPercentage,
    couponBy,
  } = req.body;
  try {
    const data = {
      couponCode,
      couponType,
      couponFor,
      couponDescription,
      couponLimit,
      startingDate,
      expiryDate,
      offerPercentage,
      couponBy,
      createdOn: new Date(),
      lastModifiedOn: new Date(),
    };
    const result = await adminCollection.findOneAndUpdate(
      {},
      { $push: { coupons: data } },
      { new: true, upsert: true }
    );
    res.send({
      data: result.coupons,
      message: "Your coupen has been added successfully",
      status: true,
    });
  } catch (error) {
    res.status(400).send({
      error: "Something went wrong",
      message: "Can't add coupen",
    });
  }
};
export const addHostRequest = async (req, res) => {
  const { userId } = req.body;
  try {
    const data = {
      requestId: nanoid(),
      userId,
      requestedOn: new Date(),
    };
    const result = await adminCollection.findOneAndUpdate(
      {},
      { $push: { hostRequests: data } },
      { new: true, upsert: true }
    );
    res.send({
      data: result,
      message: "Host request has been added successfully",
      status: true,
    });
  } catch (error) {
    res.status(400).send({
      error: "Something went wrong",
      message: "Can't request for host",
    });
  }
};
export const acceptHostRequest = async (req, res) => {
  const { userId, requestId, statusForRequest, reasonForDecline } = req.body;
  try {
    if (statusForRequest === "Accepted") {
      await userCollection.updateOne(
        { userId: userId },
        { $set: { userRole: ROLE.HOST } }
      );
    }
    const result = await adminCollection.findOneAndUpdate(
      { "hostRequests.requestId": requestId },
      {
        $set: {
          "hostRequests.$.status": statusForRequest,
          "hostRequests.$.reasonForDecline": reasonForDecline,
        },
      },
      { new: true, projection: { hostRequests: { $elemMatch: { requestId } } } }
    );
    res.send({
      data: result.hostRequests,
      message: `Request has been ${statusForRequest}`,
      status: true,
    });
  } catch (error) {
    res.status(400).send({
      error: "Something went wrong",
      message: "Can't update status",
    });
  }
};
export const getAllData = async (req, res) => {
  try {
    const result = await adminCollection.find(
      {},
      { _id: 0, coupons: 1, hostRequests: 1 }
    );
    res.send({
      data: result[0],
      message: "All data",
      status: true,
    });
  } catch (error) {
      res.status(400).send({
        error: "Something went wrong",
        message: "Can't get all data",
      });
  }
};
