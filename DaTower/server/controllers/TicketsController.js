import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addTicketToEvent)
      .delete('/:id', this.removeTicket)
  }
  async addTicketToEvent(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.addTicketToEvent(req.body)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async removeTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.removeTicket(req.params.id, req.userInfo.id)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

}


