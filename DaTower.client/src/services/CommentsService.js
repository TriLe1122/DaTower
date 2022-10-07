import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    // console.log(res.data);
    AppState.comments = res.data.map(c => new Comment(c))
    // console.log(AppState.comments)
  }

  async createComment(eventData) {
    // console.log(eventData);
    const res = await api.post(`api/comments`, eventData)
    AppState.comments = [new Comment(res.data), ...AppState.comments]
  }

  async deleteComment(commentId) {


    const res = await api.delete(`api/comments/${commentId}`)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)


  }

}
export const commentsService = new CommentsService()