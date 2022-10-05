import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
  constructor() {
    super('/api/comments')
    this.router
      .get('', this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
  }
  getCommentsByEventId(arg0, getCommentsByEventId) {
    throw new Error("Method not implemented.");
  }
  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    };
  }



}