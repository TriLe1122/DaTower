import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
  constructor() {
    super('/api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCommentToEvent)
      .delete('/:id', this.removeComment)
  }

  async createCommentToEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createCommentToEvent(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    };
  }

  async removeComment(req, res, next) {
    try {
      await commentsService.removeComment(req.params.id, req.userInfo.id)
      res.send('comment removed')
    } catch (error) {
      next(error)
    }
  }


}