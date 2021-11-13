<template>
  <div class="Ad">
    <div v-for="b in banners" :key="b.title">
      <div class="my-5">
        <img
          class="img-fluid banner elevation-5 rounded"
          :src="b.tall"
          alt=""
        />
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { bannerService } from "../services/BannerService";
export default {
  setup() {
    onMounted(async () => {
      try {
        await bannerService.getBanner();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      banners: computed(() => AppState.banners),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>