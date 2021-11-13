<template>
  <header>
  </header>
  <main class="container-fluid">
    <div class="row">
      <div class="col-2">

      </div>
      <div class="col-10">
        <div class="row">
          <Navbar />
        </div>
        <div class="row">
    <router-view />
        </div>
      </div>
    </div>
  </main>
  <footer>

  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
