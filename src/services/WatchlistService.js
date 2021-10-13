import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'

class WatchlistService {
  constructor() {
    AppState.watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
  }

  saveWatchlist() {
    localStorage.setItem('watchlist', JSON.stringify(AppState.watchlist))
  }

  async addMovie(movie) {
    const found = AppState.watchlist.find(m => m.id === movie.id)
    if (found) {
      Pop.toast('that movie is already on your list')
      return
    }
    if (movie.score < 45) {
      const yes = await Pop.confirm('are you sure you want that movie')
      if (!yes) { return }
    }
    AppState.watchlist.push(movie)
    this.saveWatchlist()
    Pop.toast(`Added ${movie.title} to your watchlist`, 'success')
  }

  async remove(movie) {
    const yes = await Pop.confirm('are you sure you want to remove this that movie')
    if (!yes) { return }
    const i = AppState.watchlist.findIndex(m => m.id === movie.id)
    if (i === -1) {
      Pop.toast('that movie is not on your list')
      return
    }
    AppState.watchlist.splice(i, 1)
    this.saveWatchlist()
    Pop.toast(`removed ${movie.title}`, 'success')
  }
}

export const watchlistService = new WatchlistService()
