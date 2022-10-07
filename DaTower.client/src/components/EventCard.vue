<template>
  <div class="EventCard m-auto my-2 box">
    <router-link :to="{name: 'Event', params:{ id: event.id}}">
      <div class="events rounded" :style="{backgroundImage: `url(${event.coverImg})`}">
        <p class="event-header fs-5">{{event.name}}</p>
        <div class="event-info on-hover">
          <p>{{event.location}}</p>
          <p>{{event.startDate.substring(0,10)}}</p>
        </div>
        <h5 class="text-white shadow capacity ">{{event.capacity}} SPOTS LEFT</h5>
        <h5 v-if="event.capacity==0" class="text-danger full text-center">No Capacity Left</h5>



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
.event-header {
  color: whitesmoke;
  text-shadow: 1px 1px black, 0px 0px 5px rgba(162, 75, 75, 0.887);
}

.events {
  border: 3px solid #474C61;
  width: 287px;
  height: 251px;
  max-width: 287px;
  max-height: 251px;
}

// .capacity {
//   background-color: #474c6171;
//   backdrop-filter: blur(8px);
// }

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