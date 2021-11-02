import * as mongoose from "mongoose";

const peopleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    ban: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [
        "admin",
        "branch",
        "merchant",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const People = mongoose.model("People", peopleSchema);

module.exports = People;
