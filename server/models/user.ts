import { Schema, model, InferSchemaType } from "mongoose";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

export const LoginValidator = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8).max(255),
});

export type LoginType = {
  name: string | null,
  email: string,
  password: string,
}

export const UserValidator = z.object({
  name: z.string().trim().min(4).max(255),
  email: z.string().trim().email(),
  password: z.string().trim().min(8).max(255),
});

export const schema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    email: { type: String, unique: true },
    password: { type: String || null, default: null },
    name: String,
  },
  { timestamps: true, strict: true, strictQuery: true, versionKey: false }
);

export type UserSchema = InferSchemaType<typeof schema>;

export const users = model<UserSchema>("User", schema, "user");