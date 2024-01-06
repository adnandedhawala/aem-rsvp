import { Schema } from "mongoose";

export const memberSchema = new Schema(
  {
    full_name: {
      type: String,
      required: [true, "name is missing"]
    },
    mobile: {
      type: String
    },
    gender: {
      type: String,
      required: [true, "gender is missing"]
    },
    hof_id: {
      type: String,
      ref: "File",
      required: [true, "hof_id is missing"]
    },
    age: {
      type: Number
    },
    _id: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
