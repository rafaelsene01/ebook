import { comments, CommentValidator, CommentSchema } from "@/server/models";
import { Validator } from "#nuxt-server-utils";
import { ErrorMessage } from "@/server/shared";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    const session = await <any>getServerSession(event)
    if (!session) throw new Error("INVALID_TOKEN");

    const { text } = await readBody<CommentSchema>(event);
    Validator.validateSchema(CommentValidator, { text, user_id: session._id });

    const { text: response } = await comments.create({
      text, user_id: session._id
    });
    return { text: response }
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