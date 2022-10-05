import { eventsService } from "./EventsService.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CommentsService {

  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
    return comments
  }
  async createCommentToEvent(commentData) {
    const event = await eventsService.getEventById(commentData.eventId)
    if (event.isCanceled) {
      throw new BadRequest('event is canceled')
    }

    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }
  async getCommentsById(id) {
    const comment = await dbContext.Comments.findById(id)
    return comment
  }
  async removeComment(id, userInfo) {
    const comment = await this.getCommentsById(id)
    // @ts-ignore
    if (comment.creatorId.toString() != userInfo) {
      throw new Forbidden('not your comment man')
    }
    comment.remove()
    return comment
  }
}

export const commentsService = new CommentsService()