import { users, LoginSchema, LoginType } from "../../models";
import { ErrorMessage } from '../../middlewares'
import { Validator } from "#nuxt-server-utils";
import jwt from 'jsonwebtoken'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody<LoginType>(event);
    Validator.validateSchema(LoginSchema, { email, password });

    const userData = await users.findOne({
      email,
    });
    if (!userData) {
      throw new Error("USER_NOT_EXISTS");
    } else {
      const token = jwt.sign({ user: { email: userData.email, name: userData.name } }, config.JWT_SECRET, { expiresIn: '4h' });
      return { token }
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