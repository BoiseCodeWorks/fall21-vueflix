<template>
  <div class="container">
    <h1>This is the watchlist page</h1>
    <div class="row">
      <div class="col-lg-4" v-for="m in watchlist" :key="m.id">
        <!-- REVIEW PROPS -->
        <Movie :movie="m" class="my-2" />
        <!-- movies.forEach(m => Movie(m)) -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
export default {
  setup() {
    return {
      watchlist: computed(() => AppState.watchlist)
    }
  }
}
</script>
