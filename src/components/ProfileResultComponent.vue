<template>
  <div class="profileResultComponent px-2 col-11">
    <div v-for="p in profiles" :key="p.id">
      <div class="card p-2 m-1 mt-3 d-flex flex-row">
        <div>
          <img
            class="profilePic elevation-3 m-2 me-3"
            height="80"
            width="80"
            :src="p.picture"
            alt=""
          />
        </div>
        <div class="d-flex flex-column justify-content-center ms-2">
          <h6 class="text-secondary m-0">
            {{ p.class }}
            <i v-show="p.graduated" class="mdi mdi-18px mdi-school"></i>
          </h6>
          <h2 class="text">{{ p.name }}</h2>
        </div>
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
      profiles: computed(() => AppState.profiles),
    };
  },
};
</script>


<style lang="scss" scoped>
.text {
  max-width: 60vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media only screen and (max-width: 600px) {
  .text {
    max-width: 20vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>