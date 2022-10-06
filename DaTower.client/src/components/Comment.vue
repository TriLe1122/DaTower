<template>
  <div class="component">

    {{comment.body}}
  </div>
</template>


<script>
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