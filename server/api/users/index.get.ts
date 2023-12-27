import { users } from "../../models";

export default defineEventHandler(async (event) => {
  try {
    const usersData = await users.find();
    return usersData
  } catch (err) {
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});