<template>

</template>


<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService.js";



export default {
  setup() {
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.id)
      } catch (error) {
        console.error('[]', error)
        Pop.error(error)
      }
    }
    onMounted(() => {
      getEventById();
    })
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>