<template>
  <div class="post col-md-12 py-1">
    <div class="card p-2 my-3 elevation-3 font">
      <div class="text-end" v-if="post.creatorId === account.id">
        <button @click="edit" class="btn btn-warning">EDIT</button>
        <button @click="remove" class="btn btn-danger">X</button>
      </div>
      <div class="d-flex p-1 align-items-center">
        <router-link :to="{ name: 'Profile', params: { id: post.creatorId } }">
          <img
            class="profilePic m-2 me-3"
            height="70"
            width="70"
            :src="post.creator.picture"
            alt=""
          />
        </router-link>
        <div>
          <router-link
            :to="{ name: 'Profile', params: { id: post.creatorId } }"
          >
            <h5 class="ms-2 text-dark">
              <b>{{ post.creator.name }}</b>
            </h5>
          </router-link>
          <h6 class="ms-2 text-secondary render-time">
            <small>{{ post.creator.createdAt }}</small>
            <i
              v-show="post.creator.graduated"
              class="mdi mdi-18px mdi-school"
            ></i>
          </h6>
        </div>
      </div>
      <h6 class="ps-4 pe-4 mt-2 line">{{ post.body }}</h6>
      <div
        v-if="post.likeIds.includes(account.id)"
        class="d-flex justify-content-end align-items-center"
      >
        <a @click="like" class="grow"
          ><i class="mdi mdi-24px colorTheme mdi-heart"></i>
        </a>
        <p class="m-0 m-2">{{ post.likeIds.length }}</p>
      </div>
      <div v-else class="d-flex justify-content-end align-items-center">
        <a @click="like" class="grow"
          ><i class="mdi mdi-24px colorTheme mdi-heart-outline"></i>
        </a>
        <p class="m-0 m-2">{{ post.likeIds.length }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { postService } from "../services/PostService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { watchEffect } from "@vue/runtime-core";
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async like() {
        try {
          await postService.like(props.post.id);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async remove() {
        try {
          await postService.remove(props.post.id);
        } catch (error) {
          logger.log(error);
          Pop.toast(error.message, "error");
        }
      },
      async edit() {
        try {
          await postService.edit(props.post.id);
        } catch (error) {
          logger.log(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss">
.line {
  line-height: 29px !important;
}
.profilePic {
  border-radius: 50%;
  object-fit: cover;
}
.colorTheme {
  color: #a892dd;
  // background-color: #a892dd;
}
.grow {
  transition: all 0.2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}
</style>