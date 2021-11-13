<template>
    <div class="profilePage col-10">
      <div class="row">
        <ProfileComponent />
        <CreatePost />
        <Thread />
      </div>
    </div>
    <div class="col-2">
    <Ad />
    </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Profile',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
