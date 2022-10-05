import { eventsService } from "./EventsService.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CommentsService {
  async removeComment(id, userInfo) {
    // const comment = await this.getCommentsByEventId(id)
    // if (comment.creatorId.toString() != userInfo.id) {
    //   throw new Forbidden('not your comment man')
    // }

    // return comment
  }
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

}

export const commentsService = new CommentsService()