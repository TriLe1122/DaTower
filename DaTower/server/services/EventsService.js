import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class EventsService {
  async editEvent(eventData, userInfo, id) {
    const event = await this.getEventById(id)
    // @ts-ignore
    if (userInfo.id != event.creatorId.toString()) {
      throw new Forbidden("this isnt your event")
    }
    event.name = eventData.name || event.name
    event.description = eventData.description || event.description
    await event.save()
    return event
  }
  async removeEvent(id, userInfo) {
    const event = await this.getEventById(id)

    // @ts-ignore
    if (event.creatorId.toString() != userInfo.id) {
      throw new Forbidden('Cant Crash This Event')
    }
    event.isCanceled = true
    await event.save()
    return event


  }
  async createEvent(eventId) {
    const event = await dbContext.Events.create(eventId)
    await event.populate('creator', 'name picture')
    return event
  }
  async getEventById(id) {
    const event = await dbContext.Events.findById(id).populate('creator', 'name picture')

    if (!event) {
      throw new BadRequest('Invalid or Bad Event Id')
    }
    return event
  }

  async getAllEvents(query) {
    const events = await dbContext.Events.find({
      isCanceled: false,
      ...query,
    }).populate('creator', 'name picture')
    return events
  }

}


export const eventsService = new EventsService()