<template>
  <div class="Event Details">
    <section class="container">
      <div class="row">
        <div class="col-12">
          <img :src="event.coverImg" alt="">
        </div>
      </div>
    </section>


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

</style>