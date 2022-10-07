<template>
  <div class="Comment align-items-center d-flex bg-warning my-2 p-1">
    <div class="col-2 ms-2">
      <img :src="comment.creator.picture" alt="" height="80" width="80" class="rounded-circle">
    </div>
    <div class="col-9">
      <b>{{comment.creator.name}}</b>
      <p>{{comment.body}}</p>
      <i class="mdi mdi-trash-can selectable text-danger rounded" @click="deleteComment()"
        v-if="account.id == comment.creatorId" aria-label="delete comment" aria-title="delete comment">
      </i>
    </div>
  </div>
</template>
 

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    comment: { type: Comment, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteComment() {
        try {
          const yes = await Pop.confirm('remove your comment?')
          if (!yes) { return }
          await commentsService.deleteComment(props.comment.id)
        } catch (error) {
          console.error('[]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>