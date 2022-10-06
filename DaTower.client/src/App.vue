<template>
  <header>

    <section class="container-fluid bg-dark">
      <div class="row justify-content-center">
        <div class="col-12 d-flex ps-3">
          <div class="logoFont">T</div>
          <span><img src="src\assets\img\Vector.png" height="50" class="mt-4" alt="logo"></span>
          <div class="logoFont">WER</div>
        </div>
      </div>
    </section>
    <!-- <Navbar /> -->

  </header>


  <main class="bg-dark  container-fluid">
    <div class="row">
      <div class="col-md-11">

        <router-view />
      </div>
      <div class="col-md-1 bg-success sticky-top">
        <Login />

      </div>

    </div>
  </main>

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Login from "./components/Login.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Login }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.logoFont {
  font-size: 60px
}
</style>
