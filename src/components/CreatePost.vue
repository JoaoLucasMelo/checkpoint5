<template>
  <div class="createPost mt-5 mtop" v-show="account.id">
    <div class="card p-3 pt-4 my-2 elevation-2 flex-row d-flex">
      <div class="col-md-2 d-flex justify-content-center media">
        <img
          class="profilePic elevation-3 m-2 me-3 media"
          height="75"
          width="75"
          :src="account.picture"
          alt=""
        />
      </div>
      <div class="col-md-10 cardmbl just p-1">
        <form @submit.prevent="create">
          <div class="mb-3">
            <textarea
              v-model="editable.body"
              class="inputtext mt-1 p-2"
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
            <div @click="create" class="d-flex flex-row selectable">
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
      profile: computed(() => AppState.profile),
      imgBtn,
      editable,
      async create() {
        try {
          imgBtn.value = true;
          await postService.create(editable.value);
          editable.value = {};
          Pop.toast("Post created!", "success");
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
  background-color: #f9f2ffce;
}
.imgurl {
  border-style: dashed !important;
  border-width: 2px !important;
  width: 100% !important;
  border-color: #beabeb !important;
  background-color: #f9f2ffca;
}
.colorTheme {
  color: #a892dd;
  // background-color: #a892dd;
}
.colorpost {
  color: rgb(100, 100, 100);
}
@media only screen and (max-width: 600px) {
  .media {
    display: none;
  }
  .imgurl {
    border-style: dashed !important;
    border-width: 2px !important;
    width: 90% !important;
    border-color: #beabeb !important;
    background-color: #f9f2ffca;
  }
  .cardmbl {
    width: 100%;
  }
  .mtop {
    margin-top: 1vh !important;
  }
}
</style>