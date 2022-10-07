<template>
  <div class="Comment align-items-center d-flex  my-2 p-1 text-dark">
    <div class="col-1 ms-2 bg-grey">
      <img :src="comment.creator.picture" alt="" height="80" width="80" class="rounded-circle">
    </div>
    <div class="col-10 p-2 comment-bg rounded">
      <b>{{comment.creator.name}}</b>
      <p>{{comment.body}}</p>
    </div>
    <i class="mdi mdi-trash-can selectable text-danger rounded ms-3" @click="deleteComment()"
      v-if="account.id == comment.creatorId" aria-label="delete comment" aria-title="delete comment">
    </i>
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
.comment-bg {
  background-color: #E2F9FF;
}
</style>