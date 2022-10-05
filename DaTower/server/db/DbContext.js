import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from "../models/Comment.js";
import { EventSchema } from "../models/Event.js";
import { TicketSchema } from "../models/Ticket.js";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Comments = mongoose.model('Comment', CommentSchema);

  Tickets = mongoose.model('Ticket', TicketSchema);

  Events = mongoose.model('Event', EventSchema);
}

export const dbContext = new DbContext()
