<template>
  <div class="profilePage col-md-8 justify-content-center">
    <div class="row justify-content-center">
      <ProfileComponent :activeProfile="activeProfile" />
      <div v-show="account.id === activeProfile.id">
        <CreatePost />
      </div>
      <Thread />
    </div>
  </div>
  <div class="col-md-2 mobile">
    <Banner />
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from "vue";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postService } from "../services/PostService";
import { profileService } from "../services/ProfileService";
export default {
  name: "Profile",
  setup() {
    const route = useRoute();
    onMounted(async () => {
      // logger.log("ROUTE", route.params);
      try {
        await profileService.getProfileById(route.params.id);
        await postService.getPostsProfileById(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
@media only screen and (max-width: 600px) {
  .mobile {
    display: none;
  }
}
</style>
