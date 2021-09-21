export class Movie {
  constructor(data) {
    this.title = data.title
    this.score = data.popularity
    this.img = 'https://image.tmdb.org/t/p/w500' + data.poster_path
    this.poster2 = 'https://image.tmdb.org/t/p/w500' + data.backdrop_path
    this.overview = data.overview
    this.id = Math.floor(Math.random() * 10000)
  }
}
