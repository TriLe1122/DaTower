import { AppState } from '../AppState'
import { Event } from "../models/Event.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async removeMyTicket(ticketId) {
    await api.delete(`api/tickets/` + ticketId)
    AppState.myTickets = AppState.myTickets.filter(t => t.id != ticketId)
  }

  async getMyTickets() {
    const res = await api.get('account/tickets')
    AppState.myTickets = res.data
    // console.log(AppState.myTickets, "mytickets");
  }

  async getMyEvents() {
    const res = await api.get('api/events')
    // console.log("My events in service", res.data)
    // console.log(AppState.myEvents, "my events");


    AppState.myEvents = res.data.map(m => new Event(m))

    AppState.myEvents = res.data.map(e => new Event(e))
    // AppState.myEvents = AppState.myEvents.filter(e => e.creator.id == AppState.account.id)
  }
}


export const accountService = new AccountService()

