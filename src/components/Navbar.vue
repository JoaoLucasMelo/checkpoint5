<template>
  <nav
    class="
      navbar navbar-expand-lg
      elevation-2
      color
      px-3
      justify-content-between
      mbf
    "
  >
    <div class="col-md-4">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center ms-2">
          <img
            alt="logo"
            src="../assets/img/a11275f644e278a1bf2cf0021c5f1648-removebg-preview.png"
            height="45"
          />
        </div>
      </router-link>
    </div>
    <div class="col-md-4">
      <SearchResult />
    </div>
    <div class="mobilenav">
      <div class="col-md-4 mobilenav d-flex align-items-center">
        <div class="m-1 d-flex align-items-center mobilenav">
          <div @click="profile" class="me-5 d-flex align-items-center">
            <i
              v-show="user.isAuthenticated"
              class="
                mdi
                selectable1
                mdi-36px
                mobilenav
                mdi-account-details
                mt-2
              "
            ></i>
            <p
              v-show="user.isAuthenticated"
              class="m-0 mobilenav ms-2 selectable1"
            >
              My Profile
            </p>
          </div>
          <i
            v-show="!user.isAuthenticated"
            @click="login"
            class="
              mdi-18px
              selectable
              mdi mdi-share-variant-outline
              fs-6
              border
              p-1
              mobilenav
              pt-1
              btnlogin
              textcolor
              mb-2
              mt-2
            "
          >
            Login
          </i>
          <div class="ms-5">
            <i
              v-show="user.isAuthenticated"
              @click="logout"
              class="
                selectable
                mdi mdi-share-variant
                fs-6
                border
                mobilenav
                btnlogout
                text-light
                mt-2
                p-1
              "
            >
              Logout
            </i>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { AuthService } from "../services/AuthService";
import { AppState } from "../AppState";
import { computed } from "vue";
import { profileService } from "../services/ProfileService";
import { postService } from "../services/PostService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async profile() {
        try {
          await profileService.profile();
          await postService.profile(this.account.id);
          router.push({ name: "Profile", params: { id: this.account.id } });
        } catch (error) {
          logger.log(error);
          Pop.toast(error.message, "error");
        }
      },
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
.btnlogout {
  border-radius: 15%;
  border-width: 2px !important;
  border-color: #7e7e7e !important;
  background-color: #ca636348 !important;
}
.btnlogin {
  border-radius: 20%;
  border-width: 3px !important;
  border-color: #e1dfe4 !important;
}
.textcolor {
  color: #4d4d4d;
}
@media only screen and (max-width: 600px) {
  .mbf {
    justify-content: center !important;
  }
  .mobile {
    display: none;
  }
}
@media only screen and (min-width: 600px) {
  .mobilenav {
    display: none;
  }
}
</style>
