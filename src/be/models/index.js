import mongoose, { model } from "mongoose";
import { userSchema } from "./user";
import { helperSchema } from "./helper";
import { memberSchema } from "./member";
import { fileSchema } from "./file";

export const User = mongoose.models.User || model("User", userSchema, "user");
export const Member =
  mongoose.models.Member || model("Member", memberSchema, "member");
export const File = mongoose.models.File || model("File", fileSchema, "file");
export const Invitee =
  mongoose.models.Invitee || model("Invitee", helperSchema, "invitee");
