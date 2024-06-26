$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {

        e.preventDefault();

        // Preparar datos para el envío
        let formData = $(this).serialize();

        // Enviar solicitud AJAX
        $.ajax({
            type: 'POST',
            // url: '/server/php/login.php',
            url: 'https://hanamiapp.000webhostapp.com/Desarrollo/ServerScript/login.php',
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

async function setCookies(param) {
    document.cookie = `sesionID=${param}; path=/; domain=example.com; secure`;

    // Realizar una solicitud con fetch
    fetch('https://hanamiapp.000webhostapp.com/endpoint.php', {
        method: 'GET',
        credentials: 'include' // Esto asegura que las cookies se envíen con la solicitud
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}
