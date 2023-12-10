/* eslint-disable unicorn/no-array-method-this-argument */
import { USER_ROLES } from "@/appConstants";
import housesData from "../../appConstants/houseData.json";
import { HouseVisits } from "../models";
import {
  addHouseSchema,
  bulkEditVisitStatusSchema,
  editVisitStatusSchema
} from "../validators";

const dataMissing = "data is missing";

export const bulkHousesUploadController = async (_request, response) => {
  const data = housesData.map(value => ({
    ...value,
    tanzeem_file_no: value.tanzeem_file_no.toString(),
    hof_id: value.hof_id.toString(),
    itsId: value.itsId.toString(),
    added_by_name: "Admin"
  }));
  try {
    await HouseVisits.insertMany(data);
    return response.status(200).send("data added successfully");
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const addHouseController = async (request, response) => {
  const { data } = request.body;
  if (!data) return response.status(400).send(dataMissing);

  try {
    const houseData = await addHouseSchema.validate(data);
    try {
      await HouseVisits.create(houseData);
      return response.status(200).send("house added to the list!");
    } catch (error) {
      return response.status(500).send(error.message);
    }
  } catch (error) {
    return response.status(400).send(error.message);
  }
};

export const editVisitStatusController = async (request, response) => {
  const { data } = request.body;
  const { houseId } = request.query;
  if (!data) return response.status(400).send(dataMissing);
  try {
    const houseData = await editVisitStatusSchema.validate(data);
    try {
      const houseVisitResponse = await HouseVisits.findByIdAndUpdate(
        houseId,
        houseData
      );
      if (houseVisitResponse === null)
        return response.status(400).send("house not found");
      return response.status(200).send("house visit status updated!");
    } catch (error) {
      return response.status(500).send(error.message);
    }
  } catch (error) {
    return response.status(400).send(error.message);
  }
};

export const getHouseListController = async (request, response) => {
  const { userData } = request;
  let queryObject = { _id: 123 };

  if (
    userData &&
    (userData.userRole.includes(USER_ROLES.Masool) ||
      userData.userRole.includes(USER_ROLES.Masoola))
  ) {
    queryObject = {
      sector: { $in: userData.assignedArea }
    };
  } else if (
    userData &&
    (userData.userRole.includes(USER_ROLES.Musaid) ||
      userData.userRole.includes(USER_ROLES.Musaida))
  ) {
    queryObject = {
      sub_sector: { $in: userData.assignedArea }
    };
  } else if (userData && userData.userRole.includes(USER_ROLES.Admin)) {
    queryObject = {};
  }
  try {
    const data = await HouseVisits.find(
      queryObject,
      " -createdAt -updatedAt -__v"
    );
    return response.status(200).send({ data });
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const bulkEditVisitStatusController = async (request, response) => {
  const { data } = request.body;
  if (!data) return response.status(400).send(dataMissing);
  try {
    const housesData = await bulkEditVisitStatusSchema.validate(data);
    const bulkQuery = housesData.map(value => ({
      updateOne: {
        filter: { _id: value._id },
        update: { ...value.fields }
      }
    }));
    try {
      await HouseVisits.bulkWrite(bulkQuery);
      return response.status(200).send("visits data updated!");
    } catch (error) {
      return response.status(500).send(error.message);
    }
  } catch (error) {
    return response.status(400).send(error.message);
  }
};
