import { Schema, model, InferSchemaType } from "mongoose";
import { z } from "zod";
import bcrypt from "mongoose-bcrypt";

export const UserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const schema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, bcrypt: true },
    name: String,
  },
  { timestamps: true, strict: true, strictQuery: true, versionKey: false }
);

export type UserType = InferSchemaType<typeof schema>;

schema.plugin(bcrypt);

export const users = model<UserType>("User", schema, "user");