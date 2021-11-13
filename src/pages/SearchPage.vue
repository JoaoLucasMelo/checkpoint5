<template>
    <div class="search col-10">
      <div class="row">
        <ProfileResultComponent />
        <Thread />
      </div>
    </div>
    <div class="col-2">
    <Ad />
    </div>

</template>


<script>
import { onMounted } from "@vue/runtime-core"
import { postService } from "../services/PostService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"

export default {
  setup(){
    
    return {}
  }}
</script>


<style lang="scss" scoped>

</style>