$(document).ready(function () {
    const toggleBottomCanvas = document.getElementById('btn-review');
    const offcanvasBottom = new bootstrap.Offcanvas(document.getElementById('movieReview'));

    toggleBottomCanvas.addEventListener('click', function (event) {
        event.stopPropagation(); // Evitar que el clic cierre el offcanvas padre
        offcanvasBottom.show(); // Mostrar el offcanvas hijo
    });

});

export function openMovie() {

    const movieCanvas = new bootstrap.Offcanvas('#movieDetails')

    movieCanvas.show()
}

export async function getMovieById(id) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.themoviedb.org/3/movie/${id}?language=es-MX`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTEyZmI5Njg5NDFhYzI0MzE0ZDEyOGYwZTYzNTQ5MyIsIm5iZiI6MTcxOTkyOTk5Mi43ODY2MjEsInN1YiI6IjY2ODQwYWNlNjQ5YjM5NDE1MzNhZjhkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cv_X_EZLRwK43MtTQ-QlJpAP9qhqwWtlMG5A52H-fpI'
        }
    };

    return new Promise((resolve, reject) => {
        $.ajax(settings)
            .done(function (response) {
                resolve(response);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            });
    });
}

function insertMetaData(movie) {

    $('#movieReview').attr('movie_id', movie.id);

    $('#ID_Movie_FK').val(movie.id);

    $('#movie-title').html(movie.title);
    $('#movie-title-mini').html(movie.title);

    $('#poster').attr('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    $('#posterMini').attr('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    
    $('#movie-sinapsis').html(movie.overview);
    $('#movie-year').html(movie.release_date.split("-")[0]);
    $('#movie-duration').html(movie.runtime + " min");

    $('#movie-studios').html("")

    for (let studio of movie.production_companies) {
        $('#movie-studios').append(
            `<li class="fw-light fs-6 mt-1">${studio.name}</li>`
        )
    }

    $('#movie-countries').html("")

    for (let country of movie.production_countries) {
        $('#movie-countries').append(
            `<li class="fw-light fs-6 mt-1">${country.name}</li>`
        )
    }

    $('#movie-languages').html("")

    for (let language of movie.spoken_languages) {
        $('#movie-languages').append(
            `<li class="fw-light fs-6 mt-1">${language.name}</li>`
        )
    }

    $('#movie-genres').html("")

    for (let genre of movie.genres) {
        $('#movie-genres').append(
            `<li class="fw-light fs-6 mt-1">${genre.name}</li>`
        )
    }

    // document.getElementById("rangeBar").addEventListener("input", function() {
    //     priceFilter = parseInt(this.value);
    //     document.getElementById("valor").textContent = priceFilter + "$";
    //     applyFilters();
    //   }); Posible codigo para el rangeBar

    
}

export async function insertMovie(id) {
    try {

        let movie = await getMovieById(id);

        console.log(movie)

        if (!movie) {
            console.error('No se pudo obtener la película con id:', id);
            return;
        }

        insertMetaData(movie);

        openMovie();

    } catch (error) {
        console.error('Error al intentar insertar la película:', error);
    }
}
