import { Account } from "./Account.js"
import { Event } from "./Event.js"

export class Ticket {
  constructor(data) {
    this.eventId = data.eventId
    this.accountId = (data.accountId)
    this.profile = new Account(data.profile)
    this.id = data.id
    this.event = new Event(data.event)
  }
}