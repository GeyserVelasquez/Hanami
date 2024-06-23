$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {

        e.preventDefault();

        // Preparar datos para el envío
        let formData = $(this).serialize();

        // Enviar solicitud AJAX
        $.ajax({
            type: 'POST',
            url: 'https://hanamiapp.000webhostapp.com/ServerScript/login.php',
            data: formData,
            dataType: 'json',
            success: function (response) {
                alert(response.message);
                if (response.status === 'success') {
                    window.location.href = "main.html";
                }
            },
            error: function (xhr, status, error) {
                console.error('Error al enviar los datos:', error);
                alert('Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.');
            }
        });
    });
});
