import * as md from '../onePage/movieDetails.js';
const userID = localStorage.getItem("ID_User");

import {getList} from '../recommend/recommend.js';
import {giveLikeMovie} from '../like/movieLike.js';

const apiKey = '7dcdb4bf5d1d1f24e860dc907f9b33e6'; // Reemplaza con tu propia API Key
const baseUrl = 'https://api.themoviedb.org/3';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        
        if (!userID) {
            throw new Error('No se encontró el ID del usuario en localStorage');
        }
  
        const trendingResponse = await fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}&language=es-ES`);
        if (!trendingResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonMovies = await trendingResponse.json();
        console.log(jsonMovies);
        const trendingMovies = jsonMovies.results;
        const trendingCarrousel = document.querySelector('.carrousel-incrementable');
        trendingCarrousel.innerHTML = ''; 
  
        trendingMovies.slice(0, 18).forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('carrousel-incrementable-item'); 
            movieElement.classList.add('movie');

            // aki va el codigo del evento click k activa el offcanbas de las reseñas

            movieElement.addEventListener('click', function () {
                md.insertMovie(movie.id);
              });
  
            const imgElement = document.createElement('img');
            imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            imgElement.alt = movie.title;
            movieElement.appendChild(imgElement);
  
            const titleElement = document.createElement('div');
            titleElement.classList.add('title');
            titleElement.textContent = movie.title;
            movieElement.appendChild(titleElement);
  
            const ratingElement = document.createElement('div');
            ratingElement.classList.add('rating');
            ratingElement.textContent = `${movie.vote_average.toFixed(1)}/10`; 
            movieElement.appendChild(ratingElement);
  
            const likeButton = document.createElement('button');
            likeButton.textContent = '❤';
            likeButton.addEventListener('click', async () => {
                try {
                    // const response = await fetch('http://localhost:3010/api/user/like', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({ userId: parseInt(userId, 10), movieId: movie.id })
                    // });
                    // if (response.ok) {
                    //     alert('Le diste like a la película');
                    // } else {
                    //     alert('Hubo un problema al dar like a la película');
                    // }

                    await giveLikeMovie(movie.id); // No se si se le deba poner el await o dejarla trabajar asincronicamente

                } catch (error) {
                    console.error('Error al dar like a la película:', error);
                }
            });
            movieElement.appendChild(likeButton);
  
            trendingCarrousel.appendChild(movieElement);
        });
  
        loadRecommendations(userID);
    } catch (error) {
        console.error('Error al obtener los datos de las películas:', error);
    }
  });

  
  
//cualquier carrosel incrementable copiar y pegar este metodo de arriba ^

  async function loadRecommendations(userId) {
    try {
        // const response = await fetch(`http://localhost:3010/api/user/${userId}/recommendations`);
        const response = await getList();
        console.log("bien hasta aqui")
        if (!response) {
            throw new Error('Network response was not ok');
        }
        const recommendedMovies = response.results; // Capaz deba quitar esto
        console.log(recommendedMovies);
        const recommendationsContainer = document.querySelector('.recommendations-container');
        recommendationsContainer.innerHTML = '';
  
        recommendedMovies.slice(0, 20).forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('recommendations-container-item');

            movieElement.addEventListener('click', function () {
                md.insertMovie(movie.id);
              });
  
            const imgElement = document.createElement('img');
            imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            imgElement.alt = movie.title;
            movieElement.appendChild(imgElement);
  
            const titleElement = document.createElement('div');
            titleElement.classList.add('title');
            titleElement.textContent = movie.title;
            movieElement.appendChild(titleElement);
  
            const ratingElement = document.createElement('div');
            ratingElement.classList.add('rating');
            ratingElement.textContent = `${movie.vote_average.toFixed(1)}/10`; 
            movieElement.appendChild(ratingElement);
  
            const likeButton = document.createElement('button');
            likeButton.textContent = '❤';
            likeButton.addEventListener('click', async () => {
                try {
                    // const response = await fetch('http://localhost:3010/api/user/like', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({ userId: parseInt(userId, 10), movieId: movie.id })
                    // });
                    // if (response.ok) {
                    //     alert('Le diste like a la película');
                    // } else {
                    //     alert('Hubo un problema al dar like a la película');
                    // }

                    giveLikeMovie(movie.id); // No se si se le deba poner el await o dejarla trabajar asincronicamente, si habia que ponerselo csm

                } catch (error) {
                    console.error('Error al dar like a la película:', error);
                }
            });
            movieElement.appendChild(likeButton);
  
            recommendationsContainer.appendChild(movieElement);

            console.log(recommendationsContainer)
        });
    } catch (error) {
        console.error('Error al obtener las recomendaciones:', error);
    }
  }

  document.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const toggle = document.querySelector('.toggle');

    if (window.scrollY > 150) {
        header.classList.add('blur');
        toggle.classList.add('hidden');
    } else {
        header.classList.remove('blur');
        toggle.classList.remove('hidden');
    }
});

