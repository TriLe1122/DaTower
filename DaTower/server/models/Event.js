import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";

export const EventSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: "Account" },
  name: { type: String, minlength: 1, required: true },
  description: { type: String, minlength: 1, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, minlength: 1, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital', 'expo', 'exhibit'] },
}, SCHEMA_OPTIONS)



EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})