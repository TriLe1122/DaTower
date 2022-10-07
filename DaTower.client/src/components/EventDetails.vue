<template>
  <div class="Event Details">
    <section class="container ">
      <div class="row cool-img " :style="{backgroundImage: `url(${event.coverImg})`}">

        <div class="col-12 filter-card">
          <div class="row">
            <div class="col-4" :style="{backgroundImage: `url(${event.coverImg})`}">
            </div>
            <div class="col-8 details shadow p-5">
              <button class="btn btn-danger" v-if="account.id == event.creatorId" @click="deleteEvent()"
                aria-label="remove event" aria-title="remove event">Cancel
                Event</button>
              <h4>{{event.name}}</h4>
              <p>{{event.location}}</p>
              <p>{{event.startDate.substring(0,10)}}</p>
              <p>{{event.description}}</p>
              <h6 class="">{{event.capacity}}<p>Spots Left</p>
              </h6>
              <button class="btn btn-warning" @click="addTicket()" :disabled="event.capacity== 0" v-if="!isAttending"
                aria-label="add ticket" aria-title="add ticket">
                <i class="mdi mdi-person-outline"></i>
                Attend
              </button>
              <button class="btn btn-danger text-white" @click="removeTicket()" v-else aria-label="remove ticket"
                aria-title="remove ticker">
                <i class="mdi mdi-close fs-4"></i>
                <!-- <h4>Un-Collab</h4> -->
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";
import { AuthService } from "../services/AuthService.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    event: {
      type: Event,
      required: true
    }
  },

  setup() {
    const route = useRoute();
    return {
      account: computed(() => AppState.account),
      isAttending: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
      async addTicket() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithPopup()
          }
          await eventsService.addTicket({ eventId: AppState.activeEvent.id || route.params.id })
        } catch (error) {
          console.error('[]', error)
          Pop.error(error)
        }
      },

      async removeTicket() {
        try {
          const yes = await Pop.confirm('are you sure you want to leave this event?')
          if (!yes) { return }
          const ticket = AppState.tickets.find(t => t.accountId == AppState.account.id && t.eventId == AppState.activeEvent.id)
          await eventsService.removeTicket(ticket.id)
        } catch (error) {
          console.error('[]', error)
          Pop.error(error)
        }
      },

      async deleteEvent() {
        try {
          const yes = await Pop.confirm('Wanna Cancel Your Own Event?')
          if (!yes) { return }
          await eventsService.deleteEvent(AppState.activeEvent.id)
        } catch (error) {
          console.error('[]', error)
          Pop.error(error)
        }
      }



    }
  }
}
</script>


<style lang="scss" scoped>
.details {
  background-color: rgba(20, 15, 15, 0.524);
  backdrop-filter: blur(10px);
}

.shadow {
  text-shadow: 1px 1px black, 0px 0px 5px #ffd464;
}
</style>