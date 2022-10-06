<template>
  <div class="Comment col-8 align-items-center d-flex">
    <img :src="comment.creator.picture" alt="" height="80" width="80" class="rounded-circle">
    <p>{{comment.creator.name}}</p>
  </div>
  <p>{{comment.body}}</p>
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