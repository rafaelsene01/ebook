import { users } from "@/server/models";

export default defineEventHandler(async (event) => {
  // BUGFIX: Violação de segurança
  // BUGFIX: Rota retorna qualquer usuario caso encontre o ID.
  const userId = getRouterParam(event, 'id')
  try {
    const usersData = await users.findOne({ _id: userId });
    return usersData
  } catch (err) {
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});