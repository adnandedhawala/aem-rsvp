import { Schema } from "mongoose";

export const rsvpDataSchema = new Schema(
  {
    member: {
      type: String,
      ref: "Member"
    },
    rsvpConfig: {
      type: String,
      ref: "RsvpConfig"
    }
  },
  { timestamps: true, strict: false }
);
