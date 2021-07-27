import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema({
  feature: String, // Only PAYIN or PAYOUT
  user: Number,
  amount: Number,
  date: { type: Date, default: Date.now },
});

db.createCollection("payment", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user", "feature", "amount", "date"],
      properties: {
        feature: {
          enum: ["PAYIN", "PAYOUT"],
          description: "can only be one of the enum values and is required",
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        amount: {
          bsonType: ["float"],
          description: "must be a float",
        },
        date: {
          bsonType: "date",
          description: "must be a valid date",
        },
      },
    },
  },
});

const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
