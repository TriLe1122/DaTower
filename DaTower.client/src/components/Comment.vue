<template>
  <div class="Comment">
    <!-- <img :src="comment.creator.picture" alt=""> -->
    {{comment?.body}}
  </div>
</template>


<script>
import { Comment } from "../models/Comment.js";

export default {
  props: {
    comment: { type: Comment, required: true }
  },
  setup() {

    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>