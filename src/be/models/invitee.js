import { Schema } from "mongoose";

export const inviteeSchema = new Schema(
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
    sector: {
      type: String,
      required: true
    },
    will_attend: {
      type: Boolean
    },
    has_filled_response: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
