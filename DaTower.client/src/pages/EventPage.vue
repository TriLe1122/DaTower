<template>

  <div class="text-light" v-for="c in comments">

    <Comment :comment="c" />
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import Comment from "../components/Comment.vue";



export default {
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
    onMounted(() => {
      getEventById();
      getCommentsByEventId();
    });
    return {
      comments: computed(() => AppState.comments)
    };
  },
  components: { Comment }
}
</script>


<style lang="scss" scoped>

</style>