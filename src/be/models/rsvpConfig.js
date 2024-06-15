import { RSVP_OPERATORS, RSVP_FIELD_TYPES, RSVP_STATUS } from "@/appConstants";
import mongoose, { Schema } from "mongoose";

export const rsvpConfigSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(RSVP_STATUS),
      required: true
    },
    heading: {
      type: String
    },
    sub_heading: {
      type: String
    },
    access: {
      id: [{ type: String }],
      conditions: [
        {
          field: String,
          value: mongoose.Mixed,
          operator: {
            type: String,
            enum: Object.values(RSVP_OPERATORS)
          }
        }
      ]
    },
    formFields: [
      {
        id: {
          type: String,
          required: true
        },
        label: {
          type: String
        },
        type: {
          type: String,
          required: true,
          enum: Object.values(RSVP_FIELD_TYPES)
        },
        extra: { type: String },
        options: [
          {
            label: {
              type: String
            },
            value: {
              type: String
            }
          }
        ],
        conditions_of_visible: [
          {
            field: String,
            value: mongoose.Mixed,
            operator: {
              type: String,
              enum: Object.values(RSVP_OPERATORS)
            }
          }
        ]
      }
    ]
  },
  { timestamps: true }
);
