import { VISIT_STATUS } from "@/appConstants";
import { Schema } from "mongoose";

export const houseVisitsSchema = new Schema(
  {
    tanzeem_file_no: {
      type: String
    },
    hof_id: {
      type: String
    },
    itsId: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    full_name: {
      type: String,
      required: true
    },
    contact: {
      type: String
    },
    sector: {
      type: String
    },
    sub_sector: {
      type: String
    },
    status: {
      type: String,
      enum: Object.values(VISIT_STATUS),
      default: VISIT_STATUS.TO_BE_VISITED
    },
    comments: {
      type: String
    },
    added_by_name: {
      type: String
    },
    added_by_contact: {
      type: String
    },
    visited_by_name: {
      type: String
    },
    visited_by_contact: {
      type: String
    },
    visit_date: {
      type: Date
    }
  },
  { timestamps: true }
);
