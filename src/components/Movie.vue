<template>
  <div class="card">
    <img :src="movie.img" alt="" class="rounded pt-2">
    <div class="card-body">
      <div class="">
        <h3 class="d-flex align-items-center justify-content-between">
          <span>{{ movie.title }}</span>
          <span>{{ movie.score }}</span>
        </h3>
        <p class="clip-text">
          {{ movie.overview }}
        </p>
        <div>
          <button class="btn btn-success" @click="addToWatchlist(movie)" v-if="!onMyList">
            Add
          </button>
          <button class="btn btn-danger" @click="remove(movie)" v-else>
            remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { watchlistService } from '../services/WatchlistService.js'
import { AppState } from '../AppState.js'

export default {
  props: {
    movie: { type: Object, required: true }
  },
  setup(props) {
    return {
      onMyList: computed(() => AppState.watchlist.find(m => m.id === props.movie.id)),
      addToWatchlist(movie) {
        watchlistService.addMovie(movie)
      },
      remove(movie) {
        watchlistService.remove(movie)
      }
    }
  }
}
</script>

<style scoped lang="scss">
img{
  object-fit: contain;
  object-position: center;
  height: 250px;
  width: 250px;
}

</style>
