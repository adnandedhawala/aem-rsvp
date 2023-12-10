import housesData from "../../appConstants/houseData.json";
import { Invitee } from "../models";

export const bulkInviteeUploadController = async (_request, response) => {
  const data = housesData.map(value => ({
    name: value.Full_Name,
    itsId: Number(value.ITS_ID),
    file_number:
      typeof value.File_No === "string" ? value.File_No : String(value.File_No),
    sector: value.Sector
  }));
  try {
    await Invitee.insertMany(data);
    return response.status(200).send("data added successfully");
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

