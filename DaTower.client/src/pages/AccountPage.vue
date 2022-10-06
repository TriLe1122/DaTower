<template>
  <section class="container-fluid">
    <div class="row">
      <h5 class="text-success">My Events</h5>
      <!-- <div class="col-md-3" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div> -->
    </div>
  </section>



  <div class="col-md-3" v-for="e in events" :key="e.id">
    <MyTickes :event="e" />
  </div>

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
      events: computed(() => AppState.myEvents),
    };
  },
  components: { EventCard, MyTickes }
}
</script>

<style scoped>

</style>
