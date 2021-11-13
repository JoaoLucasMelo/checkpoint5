<template>
  <div class="profile">
<div class="card">
  <img src="" alt="">
  <img src="" alt="">
  <h5>{{account.id}}</h5>
  <h3>{{}}</h3>
  <p>{{}}</p>
  <button class="btn btn-outline-primary"></button>
  </div>
</div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { profileService } from "../services/ProfileService"
export default {
  setup(){
    return {
      account: computed(() => AppState.account),
      async getProfileById(){
        try {
          await profileService.getProfileById(this.account.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message,'error')
        }
      },
    }
  }
  }
</script>


<style lang="scss" scoped>

</style>