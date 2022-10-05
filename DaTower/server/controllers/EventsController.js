import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {

  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventById)
      .get('/:id/comments', this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .delete('/:id', this.cancelEvent)
      .put('/:id', this.editEvent)
  }


  async getCommentsByEventId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByEventId(req.params.id)
      res.send(comments)
    } catch (error) {

    }
  }

  async cancelEvent(req, res, next) {
    try {
      const event = await eventsService.removeEvent(req.params.id, req.userInfo)
      res.send(event)
    } catch (error) {
      next(error)
    }

  }
  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.id)
      res.send(event)
    } catch (error) {
      next(error)
    }

  }

  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents(req.query)
      res.send(events)
    } catch (error) {
      next(error)
    }

  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(req.body)
      res.send(event)
    } catch (error) {
      next(error)
    }

  }

  async editEvent(req, res, next) {
    try {
      const event = await eventsService.editEvent(req.body, req.userInfo, req.params.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
}