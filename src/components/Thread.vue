<template>
  <div class="thread px-2">
    <div v-for="p in posts" :key="p.id">
      <Post :post="p"/>


    </div>
    <div class="d-flex flex-row">
      <div>
        <h3  @click="newer" class="selectable"><i class="mdi mdi-chevron-left "></i> Newer</h3>
      </div>
      <div>
        <h3 class="selectable" @click="older">Older <i class="mdi mdi-chevron-right "></i></h3>
      </div>
</div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { postService } from "../services/PostService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  setup(){
    return {
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      posts: computed(() => AppState.posts),
      async newer(){
        try {
          if( AppState.newer !== undefined){
          await postService.newer()}
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message,'error')
        }
      },
      async older(){
        try {
          if( AppState.older !== undefined){
          await postService.older()}
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message,'error')
        }
      }
    }
  }}
</script>


<style lang="scss" scoped>

</style>