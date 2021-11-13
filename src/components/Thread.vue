<template>
  <div class="thread justify-content-center">
    <div v-for="p in posts" :key="p.id">
      <Post :post="p" />
    </div>

    <div class="d-flex flex-row justify-content-center">
      <div class="mb-2 mx-5 pags" v-show="newer !== undefined || null">
        <h4 @click="newerf" class="selectable">
          <i class="mdi mdi-chevron-left"></i> Newer
        </h4>
      </div>
      <div class="mb-2 mx-5 pags" v-show="older !== undefined || null">
        <h4 class="selectable" @click="olderf">
          Older <i class="mdi mdi-chevron-right"></i>
        </h4>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { postService } from "../services/PostService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  setup() {
    return {
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      posts: computed(() => AppState.posts),
      async newerf() {
        try {
          if (AppState.newer !== undefined || null) {
            await postService.newer();
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async olderf() {
        try {
          if (AppState.older !== undefined) {
            await postService.older();
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.pags {
  color: rgb(88, 87, 87);
}
</style>