import { Account } from "./Account.js"

export class Ticket {
  constructor(data) {
    this.eventId = data.eventId
    this.accountId = (data.accountId)
    this.profile = new Account(data.profile)
  }
}