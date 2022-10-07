<template>
  <div class="mb-3 justify-content-center">
    <form @submit.prevent="handleSubmit()">
      <div>
        <div class="d-flex">
        </div>
        <div class="card bg-grey text-end mb-2 d-flex">
          <div class=" ">
            <div class="form-group m-auto card-body">
              <div class="form-group">
                <label for="exampleFormControlTextarea1" class="text-success">Join the Conversation</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="editable.body"
                  minlength="1" placeholder="Tell the people..."></textarea>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-success" type="submit">Press here, Morty</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { commentsService } from "../services/CommentsService.js";

export default {
  setup() {
    const editable = ref({})
    return {
      account: computed(() => AppState.account),
      editable,
      activeEvent: computed(() => AppState.activeEvent),
      async handleSubmit() {
        try {

          const formData = editable.value
          editable.value.eventId = AppState.activeEvent.id;
          await commentsService.createComment(formData);
          editable.value = {}
        } catch (error) {
          Pop.error(error, '[addComment]');
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
// .card {
//   background-color: rgba(3, 3, 3, 0.503);
//   backdrop-filter: blur(8px);
// }

// textarea {
//   background-color: rgba(25, 84, 11, 0.592);
// }

// .green {
//   background-color: rgba(25, 84, 11, 0.592);
// }
</style>

