<template>
  <div class="post col-md-12 py-1">
    <div class="card p-2 my-3 elevation-3 font">
      <div class="d-flex p-1 justify-content-between">
        <div class="d-flex flex-row align-items-center justify-content-between">
          <router-link
            :to="{ name: 'Profile', params: { id: post.creatorId } }"
          >
            <img
              class="profilePic elevation-3 m-2 me-3"
              height="70"
              width="70"
              :src="post.creator.picture"
              alt=""
            />
          </router-link>
          <div>
            <router-link
              class="colorname"
              :to="{ name: 'Profile', params: { id: post.creatorId } }"
            >
              <h5 class="ms-2 colorname text">
                <b>{{ post.creator.name }}</b>
              </h5>
            </router-link>
            <h6 class="ms-2 text-secondary render-time">
              <small>{{ created }}</small>
              <i
                v-show="post.creator.graduated"
                class="ms-2 mdi mdi-18px mdi-school"
              ></i>
            </h6>
          </div>
        </div>
        <div
          class="align-self-top marginbtns"
          v-if="post.creatorId === account.id"
        >
          <div>
            <i
              title="Edit post"
              @click="edithere = !edithere"
              data-bs-toggle="collapse"
              :href="'#a' + post.id + 'a'"
              class="
                mdi mdi-24px mdi-pencil
                colorTheme
                selectable1
                marginbtns
                grow
                me-2
              "
            ></i>
            <i
              title="Delete post"
              @click="remove"
              class="mdi mdi-24px mdi-close-box colorTheme selectable1 grow"
            ></i>
          </div>
        </div>
      </div>
      <form @submit.prevent="edit">
        <div class="collapse" :id="'a' + post.id + 'a'">
          <div class="card card-body m-2 ms-3 me-0 border-0">
            <div class="d-flex flex-column">
              <p class="m-0"><small>Image URL: </small></p>

              <input
                v-model="editable.imgUrl"
                class="form-control inputborder m-1"
                type="url"
                name=""
                id=""
                :placeholder="post.imgUrl"
              />
              <p class="m-0"><small>Post: </small></p>
              <textarea
                v-model="editable.body"
                class="form-control inputtext m-1"
                type="text"
                name="name"
                :placeholder="post.body"
                id=""
              ></textarea>
            </div>
            <div class="d-flex justify-content-end">
              <button
                @click="edit"
                data-bs-toggle="collapse"
                :href="'#a' + post.id + 'a'"
                class="btn btn-primary text-end"
              >
                save
              </button>
            </div>
          </div>
        </div>
      </form>
      <div v-show="edithere === true">
        <div
          v-show="post.imgUrl !== ''"
          class="d-flex justify-content-center mt-3 mb-4"
        >
          <img
            class="img-fluid elevation-3 rounded"
            :src="post.imgUrl"
            alt=""
          />
        </div>
        <h6 class="ps-4 pe-4 mt-2 line">{{ post.body }}</h6>
      </div>
      <div v-if="account.id">
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
      <div v-else class="d-flex justify-content-end align-items-center">
        <a><i class="mdi mdi-24px colorTheme mdi-heart"></i> </a>
        <p class="m-0 m-2">
          {{ post.likeIds.length }}
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import { postService } from "../services/PostService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { watchEffect } from "@vue/runtime-core";
import { format, render, cancel, register } from "timeago.js";
import moment from "moment";
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    const editable = ref({});
    let edithere = ref(true);
    let time = props.post.creator.createdAt;
    let created = format(time);
    return {
      created,
      edithere,
      editable,
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      async like() {
        try {
          await postService.like(props.post.id);
          await postService.getAll();
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async remove() {
        try {
          if (await Pop.confirm()) {
            await postService.remove(props.post.id);
            Pop.toast("Post deleted!", "success");
          }
        } catch (error) {
          logger.log(error);
          Pop.toast(error.message, "error");
        }
      },
      async edit() {
        try {
          edithere.value = true;
          await postService.edit(editable.value, props.post.id);
          editable.value = {};
          Pop.toast("Post edited!", "success");
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
  transform: scale(1.5);
}
.addMore {
  border: none;
  width: 32px;
  height: 32px;
  background-color: #eee;
  transition: all ease-in-out 0.2s;
  cursor: pointer;
}
.addMore:hover {
  border: 1px solid #888;
  background-color: #ddd;
}
.imageposted {
  border-radius: 20% !important;
}
.inputborder {
  border-color: rgb(214, 212, 212) !important;
}
.colorname {
  color: rgb(102, 102, 102) !important;
}
@media only screen and (max-width: 600px) {
  .marginbtns {
    margin-right: 0 !important;
    text-align: right !important;
  }
  .text {
    max-width: 27vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>