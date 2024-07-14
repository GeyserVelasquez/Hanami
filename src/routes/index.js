const express = require('express');
const axios = require('axios');
const router = express.Router();
const { pool } = require('../../www/db/db');

const CLIENT_ID = '7dcdb4bf5d1d1f24e860dc907f9b33e6';

router.get('/tmdb/movies/trending', async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
            params: {
                api_key: CLIENT_ID,
                language: 'es-ES'
            }
        });

        const movies = response.data.results.map(movie => ({
            id: movie.id,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
            vote_average: movie.vote_average
        }));

        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de la API de TMDb' });
    }
});

router.post('/user/like', async (req, res) => {
    const { userId, movieId } = req.body;
    try {
        console.log(`Guardando like para usuario: ${userId} y película: ${movieId}`);
        const connection = await pool.getConnection();
        const [result] = await connection.query('INSERT INTO likes (ID_User_FK, ID_Movie_FK) VALUES (?, ?)', [userId, movieId]);
        connection.release();
        console.log('Resultado de la inserción:', result);
        res.json({ success: true });
    } catch (error) {
        console.error('Error al guardar el like:', error);
        res.status(500).json({ error: 'Error al guardar el like' });
    }
});

router.get('/user/:userId/recommendations', async (req, res) => {
    const { userId } = req.params;
    try {
        const connection = await pool.getConnection();
        const [lastLikedMovie] = await connection.query(
            'SELECT ID_Movie_FK FROM likes WHERE ID_User_FK = ? ORDER BY ID_Like DESC LIMIT 1',
            [userId]
        );

        if (lastLikedMovie.length === 0) {
            // si no hay likes da recomendaciones random (por ahora solo puse trending, como en trending)
            const randomMovies = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
                params: {
                    api_key: CLIENT_ID,
                    language: 'es-ES'
                }
            });
            connection.release();
            return res.json(randomMovies.data.results);
        }

        const movieId = lastLikedMovie[0].ID_Movie_FK;

        // aqui se obtienen recomendaciones basadas en la ultima película a la que el usuario le dio like
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, {
            params: {
                api_key: CLIENT_ID,
                language: 'es-ES'
            }
        });
        connection.release();
        res.json(response.data.results);
    } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
        res.status(500).json({ error: 'Error al obtener recomendaciones' });
    }
});

module.exports = router;