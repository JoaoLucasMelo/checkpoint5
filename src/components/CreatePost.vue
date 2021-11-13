<template>
  <div class="createPost mt-4">
    <div class="card p-3 my-2 elevation-2 flex-row d-flex">
      <div class="col-2 d-flex justify-content-center">
        <img
          class="profilePic m-2 me-3"
          height="75"
          width="75"
          :src="account.picture"
          alt=""
        />
      </div>
      <div class="col-10 p-1">
        <form @submit="create">
          <div class="mb-3">
            <textarea
              v-model="editable.body"
              class="inputtext mt-1"
              id="exampleFormControlTextarea1"
              placeholder=" Share what's happening"
              rows="4"
            ></textarea>
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <div
                @click="imgBtn = !imgBtn"
                v-if="imgBtn === true"
                class="d-flex flex-row selectable"
              >
                <i class="mdi colorTheme mdi-24px mdi-image-multiple" l></i>
                <p class="ps-2 pt-1 me-1 colorpost mb-1 fs-5">Photo</p>
              </div>
              <div v-else>
                <input
                  v-model="editable.imgUrl"
                  class="imgurl"
                  type="url"
                  name=""
                  id=""
                  placeholder=" Image Url here"
                />
              </div>
            </div>
            <div class="d-flex flex-row selectable">
              <i class="mdi colorTheme mdi-24px mdi-rotate-315 mdi-send"> </i>
              <p class="ps-1 pt-1 me-1 colorpost mb-1 fs-5">Post</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postService } from "../services/PostService";
import { AppState } from "../AppState";
export default {
  setup() {
    const editable = ref({});
    let imgBtn = ref(true);
    return {
      account: computed(() => AppState.account),
      imgBtn,
      editable,
      async create() {
        try {
          imgBtn.value = !imgBtn.value;
          await postService.create(editable.value);
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
.inputtext {
  border-style: dashed;
  border-width: 2px;
  width: 100%;
  border-color: #beabeb;
  background-color: #f9f2ff;
}
.imgurl {
  border-style: dashed !important;
  border-width: 2px !important;
  width: 40vh !important;
  border-color: #beabeb !important;
  background-color: #f9f2ff;
}
.colorTheme {
  color: #a892dd;
  // background-color: #a892dd;
}
.colorpost {
  color: rgb(100, 100, 100);
}
</style>