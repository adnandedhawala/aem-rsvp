import { Schema } from "mongoose";

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is missing"]
    },
    email: {
      type: String,
      required: [true, "email is missing"]
    },
    contact: {
      type: String,
      required: [true, "contact number is missing"]
    },
    password: {
      type: String,
      required: [true, "password is missing"]
    },
    userRole: [
      {
        type: String,
        required: [true, "user role is missing"]
      }
    ],
    assignedArea: [
      {
        type: String,
        required: [true, "assigned area is missing"]
      }
    ],
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department"
    },
    itsId: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
