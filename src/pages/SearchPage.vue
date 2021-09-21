<template>
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-8">
        <MovieFinder />
      </div>
    </div>
    <div class="row result-controls" @contextmenu.prevent v-if="movies.length">
      <div class="col bg-dark">
        <button class="btn selectable me-2 text-white" @click="toggleAscending">
          <i class="mdi mdi-arrow-up" v-if="ascending"></i>
          <i class="mdi mdi-arrow-down" v-else></i>
        <!-- <i class="mdi" :class="ascending ? 'mdi-arrow-up' : 'mdi-arrow-down'"></i> -->
        </button>
        <button class="btn text-uppercase text-white selectable" @click="lowFilter = !lowFilter">
          filter terrible movies
        </button>
      </div>
    </div>
    <div class="row movies">
      <div class="col-lg-4" v-for="m in movies" :key="m.id">
        <!-- REVIEW PROPS -->
        <Movie :movie="m" class="my-2" />
        <!-- movies.forEach(m => Movie(m)) -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
export default {
  setup() {
    const ascending = ref(true)
    const lowFilter = ref(false)

    function lowFilterFunction(m) {
      if (lowFilter.value) {
        return m.score > 45
      }
      return true
    }

    function scoreSorter(a, b) {
      if (ascending.value) {
        return b.score - a.score
      }
      return a.score - b.score
    }

    return {
      ascending,
      lowFilter,
      // the rule when pulling items from the appstate is always use a computed
      movies: computed(() => AppState.movies.filter(lowFilterFunction).sort(scoreSorter)),
      toggleAscending() {
        ascending.value = !ascending.value
      }
    }
  }
}
</script>

<style>

</style>
