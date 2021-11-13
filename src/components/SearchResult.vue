<template>
  <div class="postSearchResult">
    <form @submit.prevent="searchTool" class="input-group">
      <input
        @keyup="searchTool"
        v-model="search"
        class="form-control"
        placeholder="Search..."
        type="text"
        name=""
        id=""
        required
      />
      <button class="btn btn-outline-primary">
        <i class="mdi-18px mdi mdi-magnify"></i>
      </button>
    </form>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { postService } from "../services/PostService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRoute, useRouter } from "vue-router";
import { profileService } from "../services/ProfileService";
export default {
  setup() {
    const search = ref("");
    const router = useRouter();
    return {
      search,
      async searchTool() {
        try {
          if (search.value !== "") {
            await profileService.getProfile(search.value);
            await postService.findPostByQuery(search.value);
            router.push({ name: "Search" });
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
</style>