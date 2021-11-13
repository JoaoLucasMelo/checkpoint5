<template>
  <div class="">
    <div
      class="
        login
        card
        cardleft
        elevation-1
        d-flex
        flex-column
        align-items-center
      "
    >
      <router-link :to="{ name: 'Profile', params: { id: account.id } }">
        <img
          class="profpic elevation-5"
          height="180"
          width="180"
          :src="account.picture"
          alt=""
        />
      </router-link>
      <div>
        <p class="m-0 mt-4 text-secondary text-center">{{ account.class }}</p>
        <h3>
          {{ account.name
          }}<i
            v-show="account.graduated"
            class="ms-1 mdi mdi-24px mdi-school"
          ></i>
        </h3>
      </div>
      <div
        class="
          d-flex
          flex-row
          justify-content-center
          align-items-center
          mt-4
          mb-2
        "
      >
        <i class="mdi button1 mdi-36px mdi-github"></i>
        <h6 class="m-0">{{ account.github }}</h6>
      </div>
      <div
        class="d-flex flex-row justify-content-center align-items-center mb-2"
      >
        <i class="mdi button1 mdi-36px mdi-linkedin"></i>
        <h6 class="m-0">{{ account.linkedin }}</h6>
      </div>
      <div class="d-flex flex-row justify-content-center align-items-center">
        <i class="button1 mdi mdi-36px mdi-account-details me-3"></i>
        <h6 class="m-0">My Profile</h6>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
.cardleft {
  height: 100vh;
}
.profpic {
  margin-top: 10vh;
  border-radius: 50%;
  object-fit: cover;
}
</style>