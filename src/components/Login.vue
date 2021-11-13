<template>
  <div class="media">
    <div
      v-show="user.isAuthenticated"
      class="
        card
        cardleft
        elevation-1
        d-flex
        flex-column
        justify-content-center
        align-items-center
      "
    >
      <div
        v-show="!user.isAuthenticated"
        class="d-flex flex-column align-items-center justify-content-center"
      >
        <h3 v-show="!user.isAuthenticated">Login</h3>
        <h3 v-show="!user.isAuthenticated">to</h3>
        <h3 v-show="!user.isAuthenticated">Connect!</h3>
        <button
          v-show="!user.isAuthenticated"
          @click="login"
          class="btn btn-success mt-3"
        >
          Login
        </button>
      </div>
      <div class="">
        <div></div>
        <div v-show="user.isAuthenticated">
          <img
            @click="profile"
            class="profpic elevation-5 selectable1"
            height="180"
            width="180"
            :src="account.picture"
            alt=""
          />
          <div>
            <p class="m-0 mt-4 text-secondary text-center">
              {{ account.class }}
            </p>
            <h2 class="textcolor text-center">
              {{ account.name
              }}<i
                v-show="account.graduated"
                class="ms-1 mdi mdi-24px mdi-school"
              ></i>
            </h2>
          </div>
          <div
            class="
              d-flex
              flex-row
              justify-content-center
              align-items-center
              mt-4
              mb-2
              button1
            "
          >
            <i class="mdi mdi-36px mdi-github"></i>
            <h6 class="m-0">{{ account.github }}</h6>
          </div>
          <div
            class="
              d-flex
              button1
              flex-row
              justify-content-center
              align-items-center
              mb-2
            "
          >
            <i class="mdi mdi-36px mdi-linkedin"></i>
            <h6 class="m-0">{{ account.linkedin }}</h6>
          </div>
          <div
            @click="profile"
            class="
              selectable1
              button1
              pe-3
              d-flex
              flex-row
              justify-content-center
              align-items-center
            "
          >
            <i class="mdi mdi-36px mdi-account-details me-2"></i>
            <h6 class="m-0">My Profile</h6>
          </div>
        </div>
        <div class="logout d-flex justify-content-center">
          <div class="align-self-end">
            <button
              v-show="user.isAuthenticated"
              @click="logout"
              class="btn btn-outline-danger"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { router } from "../router";
import { profileService } from "../services/ProfileService";
import { postService } from "../services/PostService";
import { AuthService } from "../services/AuthService";
export default {
  setup() {
    const router = useRouter();
    return {
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
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


<style lang="scss" scoped>
.cardleft {
  height: 100vh;
}
.profpic {
  margin-top: 1vh;
  border-radius: 50%;
  object-fit: cover;
}
.button1 {
  transition: all 0.3s ease;
  color: rgb(73, 73, 73);
  border: 3px solid rgba(255, 255, 255, 0);

  text-align: center;
  line-height: 1;

  background-color: transparent;
  padding: 10px;
  outline: none;
  border-radius: 4px;
}
.button1:hover {
  color: #a892dd;
  background-color: #c1b2e400;
}
.textcolor {
  color: #4d4d4d;
}
.logout {
  height: 20vh;
}
.connect {
  height: 70vh;
}
@media only screen and (max-width: 600px) {
  .media {
    display: none;
  }
}
</style>