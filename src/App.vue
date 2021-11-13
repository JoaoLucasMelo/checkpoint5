<template>
  <header></header>
  <main class="container-fluid">
    <div class="row">
      <div class="col-md-2 p-0">
        <Login />
      </div>
      <div class="col-md-10">
        <div class="row">
          <Navbar />
        </div>
        <div class="row justify-content-evenly scroll">
          <router-view />
        </div>
      </div>
    </div>
  </main>
  <footer></footer>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
.font {
  font-family: "Inter", sans-serif;
}
.scroll {
  height: 91vh;
  overflow-y: scroll;
}
</style>
