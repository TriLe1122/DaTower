<template>
  <section class="container-fluid">
    <div class="row events">
      <h5 class="text-success mt-3">My Events</h5>
      <div class="col-md-3 " v-for="e in events" :key="e.id">
        <EventCard :event="e" aria-label="event page and details" aria-title="event page and details"
          title="event details" />
      </div>
    </div>
    <div class="tickets">
      <!-- <h5 class="text-success">Your Tickets</h5> -->
      <div class="col-md-3" v-for="t in tickets">
        <MyTickes :ticket="t" />
      </div>
    </div>

  </section>



</template>




<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService.js"
import Pop from "../utils/Pop.js"
import EventCard from "../components/EventCard.vue"
import MyTickes from "../components/myTickes.vue"



export default {
  setup() {
    async function getMyTickets() {
      try {
        await accountService.getMyTickets();
      }
      catch (error) {
        console.error("[getting my tickets]", error);
        Pop.error(error);
      }
    }
    async function getMyEvents() {
      try {
        await accountService.getMyEvents();
      }
      catch (error) {
        console.error("[]", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getMyTickets();
      getMyEvents();
    });
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets),
      events: computed(() => AppState.myEvents.filter(e => e.creator.id == AppState.account.id)),
    };
  },
  components: { EventCard, MyTickes }
}
</script>

<style scoped>
.events {
  height: 35.5rem;
  overflow-y: auto;
}

/* .tickets {
  height: 35.5rem;
  overflow-y: auto;
} */
</style>
