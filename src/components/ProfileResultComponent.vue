<template>
  <div class="profileResultComponent px-2 col-12">
    <div v-for="p in profiles" :key="p.id">
      <router-link class="" :to="{ name: 'Profile', params: { id: p._id } }">
        <div class="card selectable p-2 m-1 mt-3 d-flex flex-row">
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
            <h2 class="text colorpost">{{ p.name }}</h2>
          </div>
        </div>
      </router-link>
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
.colorpost {
  color: rgb(100, 100, 100);
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