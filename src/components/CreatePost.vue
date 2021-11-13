<template>
  <div class="createPost">
    <div class="card p-3 my-2">
      <form @submit="create">
        <div class="mb-3">
          <textarea v-model="editable.body" class="form-control border-secondary elevation-2" id="exampleFormControlTextarea1" placeholder="Share what's happening" rows="3"></textarea>
        </div>
        <div @click="imgBtn = !imgBtn" v-if="imgBtn === true">
          <button class="btn btn-primary">Image</button>
        </div>
        <div v-else>
          <input type="url" name="" id="">
        </div>
        <button class="btn btn-primary">Post</button>
      </form>
  </div>
</div>
</template>


<script>
import { ref } from "@vue/reactivity"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { postService } from "../services/PostService"
export default {
  setup(){
    const editable = ref({})
    let imgBtn = ref(true)
    return {
      imgBtn,
      editable,
      async create(){
        try {
          imgBtn.value = !imgBtn.value
          await postService.create(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }}
</script>


<style lang="scss" scoped>

</style>