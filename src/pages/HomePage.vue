<template>
  <div class="home col-md-8 justify-content-center scrollbar">
    <div class="row justify-content-center">
      <div class="mobile">
        <!-- <div class="m-1 justify-content-between d-flex">
          <button class="btn btn-primary mt-2">My Profile</button>
          <button class="btn btn-primary mt-2">Logout</button>
        </div> -->
      </div>
      <CreatePost />
      <Thread />
    </div>
  </div>
  <div class="col-md-2 bann">
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
.scrollbar::-webkit-scrollbar {
  width: 8px;
}

.scrollbar::-webkit-scrollbar-track {
  background: #6e8070;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #e9e9e9;
  border-radius: 10px;
}
@media only screen and (max-width: 600px) {
  .mobile {
    display: block;
  }
  .bann {
    display: none;
  }
}
@media only screen and (min-width: 600px) {
  .mobile {
    display: none;
  }
  .bann {
    display: block;
  }
}
</style>
