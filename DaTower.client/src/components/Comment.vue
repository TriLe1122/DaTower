<template>
  <div class="Comment col-8 align-items-center d-flex">
    <img :src="comment.creator.picture" alt="" height="80" width="80" class="rounded-circle">
    <p>{{comment.creator.name}}</p>
  </div>
  <p>{{comment.body}}</p>
  <div>
    <i class="mdi mdi-trash-can selectable text-danger m-3 rounded" @click="deleteComment()"
      v-if="account.id == comment.creatorId">
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

</style>