export class Movie {
  constructor(data) {
    this.title = data.title
    this.score = data.popularity
    this.img = data.poster_path ? 'https://image.tmdb.org/t/p/w500' + data.poster_path : 'https://davidkoepp.com/wp-content/themes/blankslate/images/Movie%20Placeholder.jpg'
    this.poster2 = data.backdrop_path ? 'https://image.tmdb.org/t/p/w500' + data.backdrop_path : 'https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png'
    this.overview = data.overview
    this.id = data.id
  }
}
