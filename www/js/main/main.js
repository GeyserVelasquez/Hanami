const apiKey = '7dcdb4bf5d1d1f24e860dc907f9b33e6'; // Reemplaza con tu propia API Key
const baseUrl = 'https://api.themoviedb.org/3';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}&language=es-ES`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const movies = data.results;
    const carrousel = document.querySelector('.carrousel-incrementable');
    carrousel.innerHTML = '';

    movies.slice(0, 15).forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('carrousel-incrementable-item');

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
      ratingElement.textContent = `Rating: ${movie.vote_average}`;
      movieElement.appendChild(ratingElement);

      carrousel.appendChild(movieElement);
    });
  } catch (error) {
    console.error('Error al obtener los datos de las películas:', error);
  }
});
