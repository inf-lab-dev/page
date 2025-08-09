{
    const STORAGE_KEY = 'inflabs-watchlist-movies';

    const loadMovies = () =>
        JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]');
    const saveMovies = () =>
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(window.movies));

    window.addEventListener('unload', () => saveMovies());
    window.movies = loadMovies();

    // Call render initially
    render?.();
}
