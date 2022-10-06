import { Account } from "./Account.js"

export class Comment {
  constructor(data) {
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.body = data.body
    this.isAttending = data.isAttending
    this.creator = new Account(data.creator)
    this.event = new Event(data.event)
  }
}