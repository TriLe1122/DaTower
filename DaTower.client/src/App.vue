<template>
  <header>

    <!-- <section class="container-fluid bg-dark">
      <div class="row justify-content-center">
        <div class="col-12 d-flex ps-3">
          <div class="logoFont">T</div>
          <span><img src="src\assets\img\Vector.png" height="50" class="mt-4" alt="logo"></span>
          <div class="logoFont">WER</div>
        </div>
      </div>
      </section> -->
    <Navbar />

  </header>
  <main class="bg-dark">
    <router-view />
  </main>

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.logoFont {
  font-size: 60px
}
</style>
