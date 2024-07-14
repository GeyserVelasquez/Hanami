const userID = localStorage.getItem("ID_User");

export async function giveLikeMovie(movieId){

    $.ajax({
        type: 'POST',
        // url: '/server/php/login.php',
        url: 'https://hanamineposapp.000webhostapp.com/Desarrollo/ServerScript/likeMovie.php',
        data: {
            ID_User_FK: userID,
            ID_Movie_FK: movieId
        },
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                // Animation.Fire(like);
                // alert("Inicio de Sesion Exitoso");
            } else {
                Swal.fire({
                    title: "Error",
                    timer: 2000,
                    text: response.message,
                    icon: "error"
                  })
            }
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: "Error",
                timer: 2000,
                text: 'Hubo un error al dar like. Por favor, inténtalo de nuevo.',
                icon: "error"
              })
        }
    });
}

