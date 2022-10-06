import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";
import { eventsService } from "./EventsService.js"
class TicketsService {

  async addTicketToEvent(ticketData) {
    const event = await eventsService.getEventIfNotCanceled(ticketData.eventId)


    const isAttending = await this.getTicketForEvent(ticketData.eventId, ticketData.accountId)
    if (isAttending) {
      return isAttending
    }
    if (event.capacity <= 0) {
      throw new BadRequest('event sold outttttt')
    }


    const ticket = await dbContext.Tickets.create(ticketData)
    // @ts-ignore
    await event.capacity--
    await event.save()
    // @ts-ignore
    await ticket.populate('profile', 'name picture')

    return ticket

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
    const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return tickets
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
    return tickets
  }

  async removeTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket) {
      throw new BadRequest('invalid ticket id')
    }
    const event = await eventsService.getEventById(ticket.eventId)
    // @ts-ignore
    const UserOwner = userId == event.creatorId.toString()
    // @ts-ignore
    const TicketOwner = ticket.accountId.toString() == userId

    if (!UserOwner && !TicketOwner) {
      throw new Forbidden('only can remove yourself from an event man')
    }
    await ticket.remove()
    // @ts-ignore
    await event.capacity++
    await event.save()
    return ticket
  }


}


export const ticketsService = new TicketsService()





//Delete Ticket
//Must Be LoggedInOwner
//

