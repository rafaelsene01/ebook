export const ErrorMessage: any = {
  INVALID_TOKEN: {
    statusCode: 401,
    code: "INVALID_TOKEN",
    message: "User must have a valid token.",
  },
  USER_EXISTS: {
    statusCode: 409,
    code: "USER_EXISTS",
    message: "User with given email already exists.",
  },
  USER_NOT_EXISTS: {
    statusCode: 400,
    code: "USER_NOT_EXISTS",
    message: "No such user exists.",
  }
}