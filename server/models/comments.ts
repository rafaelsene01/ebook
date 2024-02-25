import { Schema, model, InferSchemaType } from "mongoose";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

export const CommentValidator = z.object({
  text: z.string().trim().min(8).max(255),
  user_id: z.string().trim().min(8).max(255),
});

export type CommentType = {
  text: string,
}

export const schema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    user_id: String,
    text: String,
  },
  { timestamps: true, strict: true, strictQuery: true, versionKey: false }
);

export type CommentSchema = InferSchemaType<typeof schema>;


export const comments = model<CommentSchema>("Comment", schema, "comment");