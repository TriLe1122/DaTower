import { dbContext } from "../db/DbContext.js";
import { eventsService } from "./EventsService.js"
class TicketsService {

  async addTicketToEvent(eventId, accountId) {
    await eventsService.getEventIfNotCanceled(eventId)

    const isAttending = await this.getTicketForEvent(eventId, accountId)
    if (isAttending) {
      return isAttending
    }
    const attending = await dbContext.Tickets.create({ eventId, accountId })
    await attending.populate('profile', 'name picture')

    return attending

  }
  async getTicketForEvent(eventId, accountId) {
    const ticket = await dbContext.Tickets.findOne({ eventId, accountId })
      .populate('profile', 'name picture')
      .populate('event', 'name description')
    return ticket
  }

  async getTicketById(id) {
    const ticket = await dbContext.Tickets.findById(id)
    return ticket
  }

  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('event', 'name description')
    return tickets
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
    return tickets
  }

  async removeTicket(id, id1) {
    throw new Error("Method not implemented.");
  }
}


export const ticketsService = new TicketsService()





//Delete Ticket
//Must Be LoggedInOwner
//

