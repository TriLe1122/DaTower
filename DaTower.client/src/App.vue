<template>
  <header>

    <section class="container-fluid bg-dark">
      <div class="row justify-content-center">
        <div class="col-12 d-flex ps-3">
          <div class="logoFont">T</div>
          <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }" aria-label="home" aria-title="home">
            <img src="src\assets\img\Vector.png" height="50" class="mt-4" alt="logo">
          </router-link>


          <!-- aria-label="" aria-title="" -->

          <div class="logoFont" aria-label="" aria-title="">WER</div>
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
      <div class="col-md-1 side-bar">


        <Login aria-label="login" aria-title="login" />


        <router-link class="navbar-brand d-flex" :to="{ name: 'Account' }" v-if="user.isAuthenticated"
          aria-label="account" aria-title="account">
          <h5>Account</h5>
        </router-link>

        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }" aria-label="home" aria-title="home">
          <h5>Home</h5>
        </router-link>

        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal"
          v-if="user.isAuthenticated" aria-label="create event" aria-title="create event">
          New Event
        </button>
        <button class="btn btn-warning" @click="logout()" v-if="user.isAuthenticated" aria-label="logout"
          aria-title="logout">
          logout
        </button>
      </div>


    </div>
  </main>

  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button> -->

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Create an Event</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form class=" account-form acc-bio p-3 rounded" @submit.prevent="handleSubmit()">
            <div class="acc-pic text-start">
              <div>
                <label for="name">Name:</label>
                <input type="text" class="form-control" v-model="editable.name">
              </div>

              <div>
                <label for="name">Location:</label>
                <input type="text" class="form-control" v-model="editable.location">
              </div>

              <div>
                <label for="name">Location:</label>
                <input type="date" class="form-control" v-model="editable.startDate">
              </div>

              <div>
                <label for="name">Capacity:</label>
                <input type="number" class="form-control" v-model="editable.capacity">
              </div>

              <div>
                <label for="coverImg">Cover Image:</label>
                <input type="url" class="form-control" v-model="editable.coverImg" name="coverImg">
              </div>

              <label for="name">Event Type</label>
              <select class="form-select" aria-label="Default select example" v-model="editable.type">
                <option selected>Open this select menu</option>
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sports</option>
                <option value="digital">Digital</option>
              </select>

              <div>
                <label for="bio">Description:</label>
                <textarea type="text" class="form-control" v-model="editable.description" name="bio" rows="8"
                  style="resize:none"></textarea>
              </div>
              <div>
                <button type="submit" class="btn btn-primary w-100 mt-2">Save</button>
              </div>
            </div>
          </form>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Login from "./components/Login.vue"
import { AuthService } from './services/AuthService'
import { eventsService } from "./services/EventsService.js"
import Pop from "./utils/Pop.js"


export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      editable.value = { ...AppState.events }
    })
    return {
      editable,
      appState: computed(() => AppState),
      user: computed(() => AppState.user),
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },

      async handleSubmit() {
        try {
          const formData = editable.value
          await eventsService.addEvent(formData)
        } catch (error) {
          console.error('[add event]', error)
          Pop.error(error)
        }
      }
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

.side-bar {
  background: linear-gradient(180deg, #474C61 0%, rgba(71, 76, 97, 0) 100%);
}
</style>
