import mongoose, { model } from "mongoose";
import { userSchema } from "./user";
import { inviteeSchema } from "./invitee";

export const User = mongoose.models.User || model("User", userSchema, "user");
export const Invitee =
  mongoose.models.Invitee || model("Invitee", inviteeSchema, "invitee");
