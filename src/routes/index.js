const { Router } = require('express');
const axios = require('axios');
const router = Router();

const CLIENT_ID = '7dcdb4bf5d1d1f24e860dc907f9b33e6'; // Reemplaza con tu Client ID

router.get('/tmdb/movies/trending', async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
            params: {
                api_key: CLIENT_ID,
                language: 'es-ES'
            }
        });

        const movies = response.data.results.map(movie => ({
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
            vote_average: movie.vote_average
        }));

        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de la API de TMDb' });
    }
});

module.exports = router;