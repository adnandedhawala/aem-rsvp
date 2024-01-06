import housesData from "../../appConstants/houseData.json";
import { File, Invitee, Member } from "../models";
import { addInviteeSchema, bulkEditVisitStatusSchema } from "../validators";

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

export const getInviteeController = async (request, response) => {
  const { file, itsId } = request.query;

  if (!file) return response.status(400).send("file is required");
  if (!itsId) return response.status(400).send("its Id is required");

  try {
    const fileData = await File.findOne({
      tanzeem_file_no: Number(file)
    });
    if (!fileData) return response.status(404).send("File not found");
    if (!fileData.member_ids.includes(itsId))
      return response.status(404).send("Its Id not found");

    const memberData = await Member.findById(itsId);
    if (!memberData) return response.status(404).send("Its Id not found");

    return response.status(200).send({ data: { memberData, fileData } });
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const addInviteeController = async (request, response) => {
  const { body } = request;
  const { data } = body;
  if (!data) return response.status(400).send("invalid request");

  try {
    const inviteedata = await addInviteeSchema.validate(data);
    try {
      await Invitee.findOneAndUpdate(
        { itsId: inviteedata.itsId },
        inviteedata,
        { upsert: true, new: true }
      );
      return response.status(200).send("Response Recieved Successfully!");
    } catch (error) {
      return response.status(500).send(error.message);
    }
  } catch (error) {
    return response.status(400).send(error.message);
  }
};

export const updateInviteeController = async (request, response) => {
  const { body, query } = request;
  const { file } = query;
  const { data } = body;

  if (!data) return response.status(400).send("invalid request");
  if (!file) return response.status(400).send("file is required");

  try {
    const inviteedata = await bulkEditVisitStatusSchema.validate(data);
    const bulkQuery = inviteedata.map(value => ({
      updateOne: {
        filter: { itsId: value.itsId },
        update: { ...value.fields }
      }
    }));
    try {
      await Invitee.bulkWrite(bulkQuery);
      return response.status(200).send("Response Recieved Successfully!");
    } catch (error) {
      return response.status(500).send(error.message);
    }
  } catch (error) {
    return response.status(400).send(error.message);
  }
};
