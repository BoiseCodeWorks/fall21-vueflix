import axios from 'axios'
import { AppState } from '../AppState.js'
import { Movie } from '../models/Movie.js'
import { logger } from '../utils/Logger.js'

const apiKey = 'api_key=545c6ef058e65396849dfbbf381cbca3&include_adult=false'

const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/search/movie'
})

class MoviesService {
  async findMoviesByQuery(query, page = 1) {
    const res = await moviesApi.get(`?query=${query}&page=${page}&${apiKey}`)
    // RULE dont ever return from the service
    logger.log('the res', res)
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.total_pages
    AppState.movies = res.data.results.map(m => new Movie(m))
  }
}

export const moviesService = new MoviesService()
