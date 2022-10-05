import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";




export const CommentSchema = new Schema(
  {
    creatorId: { type: ObjectId, required: true, ref: "Account" },
    eventId: { type: ObjectId, required: true, ref: "Event" },
    body: { type: String, required: true, },
    isAttending: { type: Boolean, default: false }
  },

  SCHEMA_OPTIONS);

CommentSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

// TODO add this to dbContext