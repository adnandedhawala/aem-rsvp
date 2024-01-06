import { Schema } from "mongoose";

export const fileSchema = new Schema(
  {
    member_ids: [
      {
        type: String
      }
    ],
    tanzeen_file_no: {
      type: Number
    },
    sub_sector: {
      name: {
        type: String
      },
      sector: {
        name: {
          type: String
        }
      }
    }
  },
  { timestamps: true }
);
