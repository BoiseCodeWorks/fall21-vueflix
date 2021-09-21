<template>
  <form @submit.prevent="findMovies" class="bg-white rounded elevation-1">
    <div class="form-group d-flex align-items-center">
      <label for="search" class="sr-only"></label>
      <input v-model="query"
             type="text"
             name="search"
             required
             class="form-control bg-white border-0"
             placeholder="search"
      >
      <button class="btn px-2 py-0" type="submit">
        <i class="mdi mdi-movie-search f-18"></i>
      </button>
    </div>
  </form>
  <div v-if="currentPage > 0 && totalPages > 0 && query" class="my-2">
    <button class="btn bg-dark me-1 selectable text-white" v-for="page in totalPages" :key="page" @click="getPage(page)">
      {{ page }}
    </button>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { moviesService } from '../services/MoviesService.js'
import Pop from '../utils/Pop.js'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'

export default {
  setup() {
    const query = ref('')

    return {
      query,
      totalPages: computed(() => AppState.totalPages),
      currentPage: computed(() => AppState.currentPage),
      async findMovies() {
        try {
          await moviesService.findMoviesByQuery(query.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async getPage(page) {
        try {
          await moviesService.findMoviesByQuery(query.value, page)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style>

</style>
