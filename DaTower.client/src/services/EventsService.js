import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { api } from "./AxiosService.js"

class EventsService {
  async getEvents(type = '') {
    let res
    if (type) {
      res = await api.get('api/events', {
        params: {
          type: type
        }
      })
    } else {
      res = await api.get('api/events')
    }

    AppState.events = res.data.map(e => new Event(e), ...AppState.events)
  }

  async getEventById(id) {
    const res = await api.get(`api/events/${id}`)
    AppState.activeEvent = new Event(res.data)
  }

  async getAttendeesByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.tickets = res.data
    console.log('get attendees', AppState.tickets);

  }

  async addTicket(eventData) {
    const res = await api.post('api/tickets', eventData)
    const ticket = res.data

    AppState.tickets.push(ticket)
    AppState.events = res.data
  }

  async addEvent(formdata) {
    const res = await api.post('api/events', formdata)
    AppState.events = [new Event(res.data), ...AppState.events]
  }
}


export const eventsService = new EventsService()