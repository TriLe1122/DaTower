<template>

  <div class="" v-if="event">
    <EventDetails :event="event" />
  </div>

  <div class="div">
    <section class="container">
      <p class="text-light">See Who's Attending!</p>
      <div class="row  bg-grey rounded p-1">
        <div class="col-12 d-flex">
          <img v-for="t in tickets" :src="t.profile?.picture" alt="" :title="t.profile?.name" class="rounded-circle"
            height="45" width="45">

        </div>
      </div>
    </section>
  </div>
  <section class="container">
    <div class="row bg-danger">
      <Comment v-for="c in comments" :comment="c" />
    </div>
  </section>

</template>


<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import Comment from "../components/Comment.vue";
import EventDetails from "../components/EventDetails.vue";
import { useRoute } from "vue-router";
import Comment1 from "../components/Comment.vue";



export default {
  props: {
    comments: { type: Comment, required: true }
  },
  setup() {
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.id);
      }
      catch (error) {
        console.error("[]", error);
        Pop.error(error);
      }
    }
    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.id);
      }
      catch (error) {
        console.error("[]", error);
        Pop.error(error);
      }
    }

    async function getAttendeesByEventId() {
      try {
        await eventsService.getAttendeesByEventId(route.params.id)
      } catch (error) {
        console.error('[]', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getEventById();
      getCommentsByEventId();
      getAttendeesByEventId()
    });
    return {
      comments: computed(() => AppState.comments),
      event: computed(() => AppState.activeEvent),
      attendees: computed(() => AppState.attendees),
      profiles: computed(() => AppState.profiles),
      tickets: computed(() => AppState.tickets)
    };
  },
  components: { Comment, EventDetails, Comment1 }
}
</script>


<style lang="scss" scoped>

</style>