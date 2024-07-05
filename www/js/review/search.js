function formatMovie(movie) {
    if (movie.loading) {
        return movie.text;
    }

    var posterUrl = movie.poster_path ? 'https://image.tmdb.org/t/p/w45' + movie.poster_path : 'https://via.placeholder.com/45x67?text=No+Image';
    var $container = $(
        '<div class="select2-result-repository clearfix">' +
            '<img src="' + posterUrl + '" alt="Poster" />' +
            '<div class="select2-result-repository__meta">' +
                '<div class="select2-result-repository__title">' + movie.title + '</div>' +
            '</div>' +
        '</div>'
    );

    return $container;
}

function formatMovieSelection(movie) {
    var posterUrl = movie.poster_path ? 'https://image.tmdb.org/t/p/w45' + movie.poster_path : 'https://via.placeholder.com/45x67?text=No+Image';
    return $('<span><img src="' + posterUrl + '" alt="Poster" /> ' + movie.title + '</span>');
}

$(document).ready(function () {
    $('#Movie').select2({
        dropdownParent: $('#form-review'),
        minimumInputLength: 1,
        ajax: {
            url: 'https://api.themoviedb.org/3/search/movie',
            dataType: 'json',
            delay: 250,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTEyZmI5Njg5NDFhYzI0MzE0ZDEyOGYwZTYzNTQ5MyIsIm5iZiI6MTcxOTkyOTk5Mi43ODY2MjEsInN1YiI6IjY2ODQwYWNlNjQ5YjM5NDE1MzNhZjhkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cv_X_EZLRwK43MtTQ-QlJpAP9qhqwWtlMG5A52H-fpI'
            },
            data: function (params) {
                return {
                    query: params.term,
                    include_adult: false,
                    language: 'en-US',
                    page: 1
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data.results, function (item) {
                        return {
                            id: item.id,
                            title: item.title,
                            poster_path: item.poster_path
                        };
                    })
                };
            },
            cache: true
        },
        templateResult: formatMovie,
        templateSelection: formatMovieSelection
    });
});