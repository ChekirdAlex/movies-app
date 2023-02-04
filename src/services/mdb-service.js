export default class MdbService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie';
  _apiKey = '439a7710468ec69dc87797e7847da69b';
  _query = 'return';

  async getMovies() {
    const res = await fetch(`${this._apiBase}?api_key=${this._apiKey}&query=${this._query}`);
    if (!res.ok) {
      return new Error('Server is unavailable');
    }
    const body = await res.json();
    return body.results;
  }
}
