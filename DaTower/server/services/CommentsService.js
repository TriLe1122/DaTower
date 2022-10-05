import { eventsService } from "./EventsService.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
  async createComment(commentData) {
    const event = await eventsService.getEventById(commentData.eventId)
    if (event.isCanceled) {
      throw new BadRequest
    }
  }

}

export const commentsService = new CommentsService()