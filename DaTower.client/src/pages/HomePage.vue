<template>
  <section class="container-fluid">
    <Banner class="" />
    <div class="col-12 bg-grey rounded">
      <div class="d-flex justify-content-around my-3 text-light">
        <button @click="getEventsByType('')" class="btn selectable text-light" aria-label="all"
          aria-title="all">All</button>
        <button @click="getEventsByType('concert')" class="btn selectable text-light" aria-label="concert"
          aria-title="concert">Concerts</button>
        <!-- <button @click="getEventsByType('expo')" class="btn selectable text-light">Expos</button> -->
        <button @click="getEventsByType('convention')" class="btn selectable text-light" aria-label="conventions"
          aria-title="conventions">Conventions</button>
        <button @click="getEventsByType('sport')" class="btn selectable text-light" aria-label="sports"
          aria-title="sports">Sports</button>
        <button @click="getEventsByType('digital')" class="btn selectable text-light" aria-label="digitals"
          aria-title="digitals">Digitals</button>
      </div>
    </div>
  </section>


  <section class="container-fluid">
    <div class="row">
      <div class="col-md-3" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState.js";
import EventCard from "../components/EventCard.vue";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import Banner from "../components/Banner.vue";


export default {
  setup() {

    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        console.error('[]', error)
        Pop.error(error)
      }
    }
    onMounted(() => {
      getEvents()
    })

    return {
      events: computed(() => AppState.events),
      async getEventsByType(type) {
        try {
          await eventsService.getEvents(type)
        } catch (error) {
          Pop.error(error, '[GetEventsByType]')
        }
      }
    };
  },
  components: { EventCard, Banner }
}
</script>

<style scoped lang="scss">

</style>
