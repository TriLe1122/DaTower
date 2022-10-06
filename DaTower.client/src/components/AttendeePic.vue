<template>
  <div class="AttendeePic">
    <img :src="attendee.profile.picture" alt="">

  </div>
</template>


<script>
export default {
  props: {
    attendee: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>