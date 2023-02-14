export default class MdbService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie';
  _apiKey = '439a7710468ec69dc87797e7847da69b';

  async getMovies(query, page) {
    const res = await fetch(`${this._apiBase}?api_key=${this._apiKey}&query=${query}&page=${page}`);
    if (!res.ok) {
      return new Error('Server is unavailable');
    }
    return res.json();
  }
}
