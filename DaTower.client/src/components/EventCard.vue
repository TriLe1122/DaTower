<template>
  <div class="EventCard m-auto my-2 box">
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

.box {
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
}
</style>