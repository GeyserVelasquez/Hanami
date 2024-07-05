$(document).ready(function () {
    $('#review-form').on('submit', function (e) {
        e.preventDefault();
        alert("siuuuuuu")

        console.log($('#Movie').val());
        console.log($('#Title').val());
        console.log($('#Text').val());
        console.log($('#Score').val());
        console.log(localStorage.getItem('ID_User'));

        // Enviar solicitud AJAX
        $.ajax({
            type: 'POST',
            url: 'https://hanamiapp.000webhostapp.com/Desarrollo/ServerScript/review.php',
            data: {
                ID_Movie_FK: $('#Movie').val(),
                Title: $('#Title').val(),
                Text: $('#Text').val(),
                Score: $('#Score').val(),
                ID_User_FK: localStorage.getItem('ID_User')
            },
            dataType: 'json',
            success: function (response) {
                alert(response.message);
                if (response.status === 'success') {
                    window.location.href = "main.html";
                }
            },
            error: function (xhr, status, error) {
                console.error('Error al enviar los datos:', error);
                alert('Hubo un error al crear la cuenta. Por favor, inténtalo de nuevo.');
            }
        });
    });
});
