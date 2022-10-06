<template>
  <div class="Event Details">
    <section class="container">
      <div class="row cool-img" :style="{backgroundImage: `url(${event.coverImg})`}">
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
              <button class="btn btn-warning">
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
import { onMounted } from "vue";
import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";
;

export default {
  props: {
    event: {
      type: Event,
      required: true
    }
  },

  setup() {
    return {
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