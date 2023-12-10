import { HouseVisits, Member } from "../models";

export const getMemberDetailsController = async (request, response) => {
  const { data } = request.body;
  if (!data || !data.itsId)
    return response.status(400).send("token is missing!");

  try {
    const existingHouse = await HouseVisits.findOne({
      itsId: data.itsId
    });
    if (existingHouse !== null)
      return response.status(400).send("House already exists!");

    const memberData = await Member.findById(data.itsId).populate({
      path: "hof_id",
      model: "File"
    });
    return response.status(200).send({ data: memberData });
  } catch (error) {
    return response.status(500).send(error.message);
  }
};
