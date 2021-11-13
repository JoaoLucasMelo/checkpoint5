<template>
  <div class="search col-md-8 justify-content-center">
    <div class="row justify-content-center">
      <h1 class="mt-4">People</h1>
      <ProfileResultComponent />
      <h1 class="mt-4">Posts</h1>
      <h5 v-show="posts.lenght" class="text-secondary">No results for posts</h5>
      <Thread />
    </div>
  </div>
  <div class="col-md-2">
    <Banner />
  </div>
</template>


<script>
import { onMounted } from "@vue/runtime-core";
import { postService } from "../services/PostService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";

export default {
  setup() {
    return {
      posts: computed(() => AppState.posts),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>