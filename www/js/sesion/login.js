// or via CommonJS

$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {

        e.preventDefault();

        // Preparar datos para el envío
        let formData = $(this).serialize();
        alert(formData);

        // Enviar solicitud AJAX
        $.ajax({
            type: 'POST',
            // url: '/server/php/login.php',
            url: 'https://hanamiapp.000webhostapp.com/Desarrollo/ServerScript/login.php',
            data: formData,
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    localStorage.setItem('ID_User', response.user_id);
                    Swal.fire({
                        title: response.user_id,
                        timer: 2000,
                        text: response.message,
                        icon: "success"
                      }).then( (response) => {
                        alert(localStorage.getItem('ID_User'));
                        window.location.href = "main.html";
                      });
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
