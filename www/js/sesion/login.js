$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
 
        let formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            //url: '/server/php/login.php',
            url: 'https://hanamineposapp.000webhostapp.com/Desarrollo/ServerScript/login.php',
            data: formData,
            dataType: 'json',
            success: function (response) {
                console.log('Respuesta del servidor:', response);
                alert(response.message);
                if (response.status === 'success') {
                    localStorage.setItem('ID_User', response.user_id);
                    alert(localStorage.getItem('ID_User'));
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