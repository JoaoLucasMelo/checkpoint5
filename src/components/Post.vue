<template>
  <div class="post col-11">
    <div class="card p-2 m-1">
      <div class="text-end">
        <button @click="remove" class="btn btn-danger">X</button>
        </div>
      
      <h5>{{post.creator.name}}</h5>
      <h6><small>{{post.creator.createdAt}}</small></h6>
      <h6>{{post.body}}</h6>
      

    </div>

  </div>
</template>


<script>
import { postService } from "../services/PostService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  props: { post: { type: Object, required: true } },
  setup(props){
    return {
      async remove(){
        try {
          await postService.remove(props.post.id)
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message,'error')
        }
      }
    }
  }}
</script>


<style lang="scss" scoped>

</style>