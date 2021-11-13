<template>
  <div class="home col-md-8 justify-content-center">
    <div class="row justify-content-center">
      <CreatePost />
      <Thread />
    </div>
  </div>
  <div class="col-md-2">
    <Banner />
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postService } from "../services/PostService";

export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });

    return {};
  },
};
</script>

<style scoped lang="scss">
</style>
