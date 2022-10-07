<template>
  <div class="EventCard m-auto my-2 box">

    <div class="events rounded" :style="{backgroundImage: `url(${ticket.event.coverImg})`}">




    </div>

  </div>
</template>

:style="{backgroundImage: `url(${ticket.event.coverImg})`}"
<script>

import { Ticket } from "../models/Ticket.js";

export default {
  props: {

    ticket: {

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