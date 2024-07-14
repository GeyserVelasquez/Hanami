const userID = localStorage.getItem("ID_User");

export async function getList(){
    const movieID = await getLastMovieLike();

    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.themoviedb.org/3/movie/${movieID}/recommendations?language=es-MX&page=1`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTEyZmI5Njg5NDFhYzI0MzE0ZDEyOGYwZTYzNTQ5MyIsIm5iZiI6MTcxOTkyOTk5Mi43ODY2MjEsInN1YiI6IjY2ODQwYWNlNjQ5YjM5NDE1MzNhZjhkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cv_X_EZLRwK43MtTQ-QlJpAP9qhqwWtlMG5A52H-fpI'
        }
      };

      return new Promise((resolve) => {
        $.ajax(settings).done(function (response) {
            console.log(response);
            resolve(response);
          });
      })
      
      
}

async function getLastMovieLike() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: 'https://hanamineposapp.000webhostapp.com/Desarrollo/ServerScript/getLastMovieLike.php',
            data: {
                ID_User_FK: userID
            },
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    resolve(response.ID_Movie_FK);
                } else {
                    Swal.fire({
                        title: "Error",
                        timer: 2000,
                        text: response.message,
                        icon: "error"
                    });
                    reject(new Error(response.message));
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error",
                    timer: 2000,
                    text: 'Hubo un error al dar like. Por favor, inténtalo de nuevo.',
                    icon: "error"
                });
                reject(new Error('Hubo un error al dar like.'));
            }
        });
    });
}