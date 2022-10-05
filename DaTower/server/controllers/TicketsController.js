import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.getTicketToEvent)
      .delete('/:id', this.removeTicket)
  }
  async getTicketToEvent(req, res, next) {
    try {
      const ticket = await ticketsService.getTicketToEvent(req.body.eventId, req.userInfo.id)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async removeTicket(req, res, next) {
    try {
      const ticket = await ticketsService.removeTicket(req.params.id, req.userInfo.id)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

}


