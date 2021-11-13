<template>
  <div class="profileResultComponent px-2 col-11">
    <div v-for="p in profiles" :key="p.id">  
      <div class="card p-2 m-1">
      <h5>{{p.name}}</h5>
      <h6><small>{{p.email}}</small></h6>
      <h6>{{p.graduated}}</h6>
    </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup(){
    return {
      profiles: computed(() => AppState.profiles)

    }
  }}
</script>


<style lang="scss" scoped>

</style>