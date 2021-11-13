<template>
  <div class="profile mt-5">
    <div
      class="card bg-white border-0 my-2 back elevation-3 d-flex flex-nowrap"
    >
      <div>
        <div class="d-flex justify-content-between">
          <img
            class="picture border-0 elevation-3"
            height="190"
            width="190"
            :src="activeProfile.picture"
            alt=""
          />
          <div class="align-self-end mb-5 me-3">
            <i class="mdi button1 mdi-48px mdi-github selectable1"></i>
            <i class="mdi button1 mdi-48px mdi-linkedin selectable1"></i>
            <i class="button1 mdi mdi-48px mdi-account-details selectable1"></i>
          </div>
        </div>
        <div class="cont">
          <p class="text-secondary m-0 p-0 fs-5">{{ activeProfile.class }}</p>
          <h3 class="textcolor">{{ activeProfile.name }}</h3>
          <p class="fs-5 fst-italic line pe-4 textcolor">
            {{ activeProfile.bio }}
          </p>
        </div>
        <div v-show="account.id == activeProfile.id" class="text-end me-3">
          <p class="p-1 pb-2">
            <a
              class="button1 edit text-secondary selectable"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Edit
            </a>
          </p>
          <form @submit="edit">
            <div class="collapse" id="collapseExample">
              <div class="card card-body me-0 border-0">
                <div class="d-flex flex-column align-items-center">
                  <div class="d-flex justify-content-between">
                    <p class="me-1"><small>Name: </small></p>
                    <input
                      v-model="editable.name"
                      class="form-control inputtext m-1 widinput"
                      type="text"
                      name="name"
                      :placeholder="account.name"
                      id=""
                    />
                    <p class="ms-3"><small>Class:</small></p>
                    <input
                      v-model="editable.class"
                      class="form-control inputtext m-1 widinput"
                      type="text"
                      name="class"
                      :placeholder="account.class"
                      id=""
                    />
                  </div>
                  <div class="d-flex">
                    <p class="me-2"><small>Cover:</small></p>
                    <input
                      v-model="editable.coverImg"
                      class="form-control inputtext m-1 widinput"
                      type="url"
                      name="coverImg"
                      :placeholder="account.coverImg"
                      id=""
                    />
                    <p><small>Picture:</small></p>
                    <input
                      v-model="editable.picture"
                      class="form-control inputtext m-1 widinput"
                      type="url"
                      name="picture"
                      :placeholder="account.picture"
                      id=""
                    />
                  </div>
                  <div class="d-flex">
                    <p><small>GitHub:</small></p>
                    <input
                      v-model="editable.github"
                      class="form-control inputtext m-1 widinput"
                      type="text"
                      name="github"
                      :placeholder="account.github"
                      id=""
                    />
                    <p><small>Linkedin:</small></p>
                    <input
                      v-model="editable.linkedin"
                      class="form-control inputtext m-1 widinput"
                      type="text"
                      name="linkedin"
                      :placeholder="account.linkedin"
                      id=""
                    />
                  </div>
                </div>
                <div class="align-self-center bio">
                  <p class="text-start m-0 p-0"><small>Bio:</small></p>
                  <textarea
                    v-model="editable.bio"
                    class="inputtext mt-2 rounded widbio"
                    id="exampleFormControlTextarea1"
                    :placeholder="account.bio"
                    rows="4"
                  ></textarea>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="d-flex mt-3">
                    <p class="text-start fw-light me-2">
                      <small>Graduated?</small>
                    </p>
                    <div class="form-check">
                      <input
                        v-model="editable.graduated"
                        :checked="account.graduated"
                        class="form-check-input border-secondary"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                  <div class="selectable pt-2 m-2">
                    <i
                      @click="edit"
                      class="mdi mdi-24px colorTheme mdi-content-save-edit"
                      data-bs-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <b class="colorpost fw-normal p-1 fs-5">Save</b>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { accountService } from "../services/AccountService";
import { useRoute } from "vue-router";

export default {
  props: { activeProfile: { type: Object, required: true } },
  setup(props) {
    const editable = ref({});
    return {
      editable,
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile),
      coverImg: computed(() => `url(${props.activeProfile.coverImg})`),
      async edit() {
        try {
          await accountService.edit(editable.value);
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
.coverimg {
  height: 20vh;
  width: 100%;
  object-fit: cover;
}
.picture {
  border-radius: 50%;
  margin-top: 17vh;
  margin-left: 8vh;
  object-fit: cover;
}
.back {
  // background-image: v-bind(coverImg);
  background: v-bind(coverImg);
  background-size: 100% 28vh;
  background-repeat: no-repeat;
  position: unset;
  object-fit: cover;
  height: auto;
}
.cont {
  margin-left: 5vh;
  margin-top: 2vh;
}
.button1 {
  transition: all 0.3s ease;
  color: rgb(73, 73, 73);
  border: 3px solid rgba(255, 255, 255, 0);
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  text-align: center;
  line-height: 1;
  font-size: 17px;
  background-color: transparent;
  padding: 10px;
  outline: none;
  border-radius: 4px;
}
.button1:hover {
  color: #a892dd;
  background-color: #c1b2e400;
}
.inputtext {
  border-width: 2px !important;

  border-color: #beabeb !important;
  background-color: #f9f2ff !important;
}
.colorTheme {
  color: #a892dd;
  // background-color: #a892dd;
}
.colorpost {
  color: rgb(100, 100, 100);
}
.edit {
  border-width: 2px;
  border-color: #a892dd;
}
.grow {
  transition: all 0.2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}
.line {
  line-height: 34px !important;
}
.textcolor {
  color: #4d4d4d;
}

.widinput {
  width: 25vh;
}
.widbio {
  width: 100%;
  max-width: 80vh;
}
.bio {
  width: 90%;
}
</style>