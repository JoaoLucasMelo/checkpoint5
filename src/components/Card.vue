<template>
  <div class="card row">
    <div class="modal-header mb-3 justify-content-center">
      <img
        class="mb-3 img"
        src="../assets/img/Untitledpurple.png"
        height="50"
        alt=""
      />
    </div>
    <div class="d-flex justify-content-between mt-1">
      <div class="col-md-6">
        <img
          class="picture center"
          height="170"
          width="170"
          :src="activeProfile.picture"
          alt=""
        />
      </div>
      <div class="col-md-6 text-center">
        <h2 class="m-0">{{ activeProfile.name }}</h2>
        <p class="f-10 color mt-1">
          {{ activeProfile.class }}
          <i
            v-show="activeProfile.graduated"
            class="ms-1 mdi mdi-18px mdi-school"
          ></i>
        </p>
        <p class="text mt-4 text-start">
          {{ "Email: " + activeProfile.email }}
        </p>
        <p class="text mt-3 text-start">
          {{ "Github:  " + activeProfile.github }}
        </p>
        <p class="text mt-3 text-start">
          {{ "Linkedin:  " + activeProfile.linkedin }}
        </p>
      </div>
    </div>
    <div class="row mt-2">
      <p class="m-0 f-16">Bio:</p>
      <p class="bio fw-light f-14">{{ "“" + activeProfile.bio + "”" }}</p>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      activeProfile: computed(() => AppState.activeProfile),
    };
  },
};
</script>


<style lang="scss" scoped>
.text {
  max-width: 35vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@mixin hc() {
  left: 50%;
  transform: translatex(-50%);
}

@mixin vc() {
  top: 50%;
  transform: translatey(-50%);
}

@mixin cc() {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@mixin scrollbars($size, $foreground-color, $background-color) {
  body {
    scrollbar-face-color: $foreground-color;
    scrollbar-track-color: $background-color;
  }
}

@include scrollbars(2px, rgba(255, 255, 255, 0.15), transparent);

div {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.card {
  margin: auto;
  padding: 2em;
  border-radius: 7%;
  border: 2px solid transparentize(rgb(207, 207, 207), 0.5);
  text-shadow: 0 0 1em transparentize(black, 0.5);
  background: transparentize(rgb(235, 235, 235), 0.8);
  backdrop-filter: blur(20px);
  transform: perspective(500px);
  transform-style: preserve-3d;
  height: auto;
  min-height: 50vh;
  min-width: 60vh;
}
.picture {
  border-radius: 10%;
  object-fit: cover;
  border: 1px solid transparentize(rgb(170, 169, 169), 0.5);
}
.bio {
  line-height: 1.7em;
}
.color {
  color: rgb(185, 185, 185);
}
</style>