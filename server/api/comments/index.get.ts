import { comments } from "@/server/models";
import { ErrorMessage } from "@/server/shared";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    const texts = await comments.find().select('text')
    return texts.map(i => i.text)
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