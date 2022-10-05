<template>
  <div class="EventCard m-auto my-2">
    <router-link :to="{name: 'Event', params:{ id: event.id}}">
      <div class="events" :style="{backgroundImage: `url(${event.coverImg})`}">

        <p class="text-danger fs-5">{{event.name}}</p>
        <div class="event-info on-hover ">
          <p>{{event.location}}</p>
          <p>{{event.startDate.substring(0,10)}}</p>
          <p>{{event.capacity}}</p>

        </div>



      </div>
    </router-link>
  </div>
</template>


<script>
import { Event } from "../models/Event.js";

export default {
  props: {
    event: {
      type: Event,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.events {
  border: 3px solid #474C61;
  width: 287px;
  height: 251px;
  max-width: 287px;
  max-height: 251px;
}

.event-info {
  backdrop-filter: blur(8px);
  background-color: #474c612b;

}
</style>