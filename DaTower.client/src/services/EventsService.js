import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { api } from "./AxiosService.js"

class EventsService {
  async getEvents(type = '') {
    let res
    if (type) {
      res = await api.get('api/events', {
        params: {
          category: type
        }
      })
    } else {
      res = await api.get('api/events')
    }

    AppState.events = res.data.map(e => new Event(e))
  }
}

export const eventsService = new EventsService()