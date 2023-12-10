import mongoose, { model } from "mongoose";
import { fileSchema } from "./file";
import { memberSchema } from "./member";
import { userSchema } from "./user";
import { houseVisitsSchema } from "./houseVisits";

export const User = mongoose.models.User || model("User", userSchema, "user");
export const Member =
  mongoose.models.Member || model("Member", memberSchema, "member");
export const File = mongoose.models.File || model("File", fileSchema, "file");
export const HouseVisits =
  mongoose.models.HouseVisits ||
  model("HouseVisits", houseVisitsSchema, "houseVisits");
