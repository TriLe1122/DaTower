<template>
  <div class="EventCard ticket row my-4 position-relative rounded border border-success border-3">

    <div class="col-4">
      <router-link :to="{name: 'Event', params:{ id: ticket.event.id}}" aria-label="event page and details"
        aria-title="event page and details">
        <img :src="ticket.event.coverImg" alt="" class="events fluid absolute" :title="ticket.event.name">
      </router-link>
    </div>
    <div class="col-8">
      <button class="btn btn-danger cancel" @click="removeTicket()" aria-label="remove ticket"
        aria-title="remove ticket">Remove Ticket</button>
    </div>




  </div>

</template>

:style="{backgroundImage: `url(${ticket.event.coverImg})`}"
<script>


import { Ticket } from "../models/Ticket.js";
import { accountService } from "../services/AccountService.js";
import Pop from "../utils/Pop.js";


export default {
  props: {

    ticket: {
      type: Object,
      required: true


    }
  },
  setup(props) {
    return {
      async removeTicket() {
        try {
          const yes = await Pop.confirm('give this ticket back??');
          if (!yes) {
            return;
          }
          await accountService.removeMyTicket(props.ticket.id);
        } catch (error) {
          Pop.error(error, '[removeTicket]');
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.cancel {
  transform: translateX(9rem) translateY(6rem);
}

.ticket {
  background-image: url("../assets/img/Ticket.png");
  width: max-content;
}

.event-header {
  color: whitesmoke;
  text-shadow: 1px 1px black, 0px 0px 5px rgba(162, 75, 75, 0.887);
}

.events {
  // border: 3px solid #474C61;
  width: 287px;
  height: 251px;
  transform: translateX(-11px);
  // max-width: 287px;
  // max-height: 251px;
}

.full {
  background-color: rgba(232, 25, 25, 0.455);
  text-shadow: 1px 1px black, 0px 0px 5px rgba(162, 75, 75, 0.887);
}

.shadow {
  text-shadow: 1px 1px black, 0px 0px 5px rgba(162, 75, 75, 0.887);
}

.event-info {
  backdrop-filter: blur(8px);
  background-color: #474c61c5;

}
</style>