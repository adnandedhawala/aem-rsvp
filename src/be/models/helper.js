import { Schema } from "mongoose";

export const helperSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    itsId: {
      type: Number,
      required: true
    },
    file_number: {
      type: String,
      required: true
    },
    mobile: {
      type: String
    },
    sector: {
      type: String
    },
    sub_sector: {
      type: String
    },
    enrolled_for_khidmat: {
      type: String
    },
    khidmat_name: {
      String
    },
    can_provide_utara: {
      type: String
    },
    age: {
      type: Number
    },
    gender: {
      type: String
    }
  },
  { timestamps: true }
);
