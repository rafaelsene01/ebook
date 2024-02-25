import { users } from "@/server/models";
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const { sub: userId } = await getToken({ event })
  try {
    const usersData = await users.findOne({ _id: userId }).select("-password");
    return usersData
  } catch (err) {
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});