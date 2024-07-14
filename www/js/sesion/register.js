$(document).ready(function () {
    $('#registerForm').on('submit', function (e) {
        e.preventDefault();

        // Obtener valores de las contraseñas
        let password = $('.input-password').val();
        let confirmPassword = $('.input-password-confirm').val();

        // Verificar si las contraseñas coinciden
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Preparar datos para el envío
        var formData = $(this).serialize();

        // Enviar solicitud AJAX
        $.ajax({
            type: 'POST',
            // url: '/server/php/register.php',
            url: 'https://hanamineposapp.000webhostapp.com/Desarrollo/ServerScript/register.php',
            data: formData,
            dataType: 'json',
            success: function (response) {
                alert(response.message);
                if (response.status === 'success') {
                    window.location.href = "login.html";
                }
            },
            error: function (xhr, status, error) {
                console.error('Error al enviar los datos:', error);
                alert('Hubo un error al crear la cuenta. Por favor, inténtalo de nuevo.');
            }
        });
    });
});

// Perfil; imagen > Default "Podria Gustarte", muestre trending ; cuando likes muestre recomendacion en base a eso > Like Perfiles
