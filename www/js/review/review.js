$(document).ready(function () {
    $('#review-form').on('submit', function (e) {
        e.preventDefault();
        alert("epale brother")
        console.log("saudo desde el review")

        let movieID = $('#movieReview').attr('movie_id');
        let Text = $('#Text').val();
        let rate = $('input[name="rating"]:checked').val() || 0
        let userID = localStorage.getItem('ID_User');

        let spoiler = $('#checkboxId').prop('checked') ? '1' : '0';

        console.log(movieID);
        console.log(Text);
        console.log(rate)
        console.log(spoiler);
        console.log(userID);

        // Enviar solicitud AJAX
        $.ajax({
            type: 'POST',
            url: 'https://hanamineposapp.000webhostapp.com/Desarrollo/ServerScript/review.php',
            data: {
                ID_Movie_FK: movieID,
                Text: Text,
                Score: rate,
                Spoiler: spoiler,
                ID_User_FK: userID
            },
            dataType: 'json',
            success: function (response) {
                alert();
                if (response.status === 'success') {
                    Swal.fire({
                        title: "Nueva Reseña",
                        timer: 2000,
                        text: response.message,
                        icon: "success"
                    }).then(() => {
                        alert("fuera de close")
                        closeCanvas();
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error al enviar los datos:', error);
                alert('Hubo un error al crear la resenia. Por favor, inténtalo de nuevo.');
            }
        });
    });
});

function closeCanvas() {
    // alert("dentro de close")

    // const rigthCanva = document.getElementById('movieDetails');
    // const detailCanva = new bootstrap.Offcanvas(rigthCanva);
    // const bottomCanva = document.getElementById('movieReview');
    // const reviewCanva = new bootstrap.Offcanvas(bottomCanva);
    // detailCanva.hide();// Cambie esto de index a main
    // reviewCanva.hide();

    window.location.href = "main.html"

}


$.ajax({
    url: 'file.php',
    method: 'POST',
    datatype: 'json',
    data: {
        name: $('#name').val(),
        lastName: $('#lastName').val(),
        mail: $('#mail').val()
    },
    success: function (response) {
        alert(response);
    }
    ,
    error: function (error) {
        alert("mano, mala mia");
    }
});
