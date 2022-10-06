import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    console.log(res.data);
    AppState.comments = res.data.map(c => new Comment(c))
    console.log(AppState.comments)
  }

}
export const commentsService = new CommentsService()