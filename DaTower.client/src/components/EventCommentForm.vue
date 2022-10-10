<template>
  <div class="mb-3 justify-content-center">
    <form @submit.prevent="handleSubmit()" aria-label="comment on an event" aria-title="comment on an event">
      <div>
        <div class="d-flex">
        </div>
        <div class="card border-none bg-grey text-end mb-2 d-flex">
          <div class=" ">
            <div class="form-group m-auto card-body">
              <div class="form-group">
                <label for="exampleFormControlTextarea1" class="text-success mb-2">Join the Conversation</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="editable.body"
                  minlength="1" placeholder="Tell the people..." required></textarea>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-success" type="submit" aria-label="submit comment" aria-title="submit comment">Post
              Comment</button>
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
import { AuthService } from "../services/AuthService.js";

export default {
  setup() {
    const editable = ref({})
    return {
      account: computed(() => AppState.account),
      editable,
      activeEvent: computed(() => AppState.activeEvent),

      async handleSubmit() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithPopup()
          }

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

</style>

