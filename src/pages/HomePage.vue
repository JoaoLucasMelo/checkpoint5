<template>
    <div class="home col-10">
      <div class="row">
        <CreatePost />
        <Thread />
      </div>
    </div>
    <div class="col-2">
    <Ad />
    </div>

</template>

<script>
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import {postService} from "../services/PostService"

export default {
  name: 'Home',
  setup(){
    onMounted(async() => {
      try {
        await postService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })


    return{
  }
  }}
</script>

<style scoped lang="scss">



</style>
