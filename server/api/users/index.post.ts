import { users, UserType, UserSchema } from "@/server/models";
import { Validator } from "#nuxt-server-utils";
import { ErrorMessage } from "@/server/shared";

export default defineEventHandler(async (event) => {
  try {
    const { email, password, name } = await readBody<UserType>(event);
    Validator.validateSchema(UserSchema, { email, password, name });

    const userData = await users.findOne({
      email,
    });
    if (userData) {
      throw new Error("USER_EXISTS");
    } else {
      const newUserData = await users.create({
        email,
        password,
        name,
      });
      return newUserData
    }
  } catch (err) {
    if (err instanceof Error) {
      const error = ErrorMessage[err.message] || {
        statusCode: 500,
        code: "ERROR",
        message: "Something wrong.",
      }
      event.node.res.statusCode = error.statusCode;
      return {
        code: error.code,
        message: error.message,
      };
    }
  }
});