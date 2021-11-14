<template>
  <nav
    class="
      navbar navbar-expand-lg
      elevation-2
      color
      px-3
      justify-content-between
    "
  >
    <div class="col-4">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center">
          <img
            alt="logo"
            src="../assets/img/a11275f644e278a1bf2cf0021c5f1648-removebg-preview.png"
            height="45"
          />
        </div>
      </router-link>
    </div>
    <div class="col-4">
      <SearchResult />
    </div>
  </nav>
</template>

<script>
import { AuthService } from "../services/AuthService";
import { AppState } from "../AppState";
import { computed } from "vue";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.color {
  background: rgb(168, 146, 221);
  background: linear-gradient(
    90deg,
    rgba(168, 146, 221, 1) 0%,
    rgba(139, 108, 218, 1) 0%,
    rgba(181, 160, 232, 1) 100%
  );
}
</style>
