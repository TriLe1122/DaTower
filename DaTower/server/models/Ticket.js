import mongoose from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";
const Schema = mongoose.Schema;


export const TicketSchema = new Schema(
  {
    eventId: { type: ObjectId, ref: "Event", required: true },
    accountId: { type: ObjectId, ref: "Account", required: true },
  },

  SCHEMA_OPTIONS);

TicketSchema.virtual("account", {
  localField: "accountId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

TicketSchema.virtual("event", {
  localField: "eventId",
  foreignField: "_id",
  justOne: true,
  ref: "Event",
});

TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true })

// TODO add this to dbContext