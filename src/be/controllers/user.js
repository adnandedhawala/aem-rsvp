import { sign, verify } from "jsonwebtoken";
import { User } from "../models";
import { USER_ROLES } from "@/appConstants";

export const loginController = async (request, response) => {
  const { data } = request.body;
  if (!data || !data.email || !data.password)
    response.status(400).end("login data is missing!");
  try {
    const loginUser = await User.findOne({ email: data.email });
    if (!loginUser) return response.status(400).send("user not found");
    if (!loginUser.userRole.includes(USER_ROLES.Admin))
      return response.status(400).send("user does not have access!");
    const isPasswordCorrect = data.password === loginUser.password;
    if (isPasswordCorrect) {
      const tokenData = {
        name: loginUser.name,
        email: loginUser.email,
        userRole: loginUser.userRole,
        assignedArea: loginUser.assignedArea,
        contact: loginUser.contact,
        itsId: loginUser.itsId,
        _id: loginUser._id
      };
      const authToken = sign(
        tokenData,
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_SALT,
        {
          expiresIn: "20h"
        }
      );
      return response.status(200).send({ data: authToken });
    } else {
      return response.status(400).send("invalid credentials");
    }
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const verifyUserController = async (request, response) => {
  const { data } = request.body;
  if (!data || data === "")
    return response.status(401).end("token is missing!");
  try {
    const userData = verify(data, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SALT);
    return response.status(200).send(userData);
  } catch (error) {
    return error.name === "TokenExpiredError"
      ? response.status(403).send("user session has expired")
      : response.status(401).send("invalid access token");
  }
};
