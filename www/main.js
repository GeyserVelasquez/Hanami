document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/tmdb/movies/trending');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const movies = await response.json();
        const carrousel = document.querySelector('.carrousel-incrementable');
        carrousel.innerHTML = ''; 

        movies.slice(0, 15).forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('carrousel-incrementable-item');

            const imgElement = document.createElement('img');
            imgElement.src = movie.image;
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