import { users, UserValidator, UserSchema } from "@/server/models";
import { Validator, } from "#nuxt-server-utils";
import { ErrorMessage } from "@/server/shared";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  try {
    const { email, password, name } = await readBody<UserSchema>(event);
    Validator.validateSchema(UserValidator, { email, password, name });

    const userData = await users.findOne({
      email,
    });
    if (userData) {
      throw new Error("USER_EXISTS");
    } else {
      await users.create({ email, password: await bcrypt.hash(password, 10), name });
    }
  } catch (err) {
    const { cause }: any = err
    if (cause) {
      event.node.res.statusCode = cause.statusCode;
      return {
        code: cause.statusMessage,
        message: Object.keys(cause.data).reduce((result, item) => [...result, `${item}: ${cause.data[item]}`], [] as string[]),
      };
    } else
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