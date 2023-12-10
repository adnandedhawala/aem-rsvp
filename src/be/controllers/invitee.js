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

export const resetInviteeController = async (_request, response) => {
  try {
    await Invitee.updateMany(
      {},
      { $set: { will_attend: false, has_filled_response: false } }
    );
    return response.status(200).send("Data is reset");
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const getInviteeListController = async (_request, response) => {
  try {
    const data = await Invitee.find({}).sort("file_number");
    return response.status(200).send({ data });
  } catch (error) {
    return response.status(500).send(error.message);
  }
};
