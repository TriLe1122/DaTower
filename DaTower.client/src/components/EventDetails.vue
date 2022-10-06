<template>
  <div class="Event Details">
    <section class="container ">
      <div class="row cool-img " :style="{backgroundImage: `url(${event.coverImg})`}">
        <div class="col-12 filter-card">
          <div class="row">
            <div class="col-4" :style="{backgroundImage: `url(${event.coverImg})`}">
            </div>
            <div class="col-8 details shadow p-5">
              <h4>{{event.name}}</h4>
              <p>{{event.location}}</p>
              <p>{{event.startDate.substring(0,10)}}</p>
              <p>{{event.description}}</p>
              <h6 class="text-dark">{{event.capacity}}<p>Spots Left</p>
              </h6>
              <button class="btn btn-warning" @click="addTicket()" :disabled="event.capacity== 0">
                <i class="mdi mdi-person-outline"></i>
                Attend
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
      async addTicket() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithPopup()
          }
          // if (AppState.account.id == AppState.event.id) {
          //   throw new Error('youre already attending')
          // }

          await eventsService.addTicket({ eventId: AppState.activeEvent.id || route.params.id })
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