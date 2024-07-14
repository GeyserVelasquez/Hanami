$(document).ready(function() {
    function testDBConnection() {
        $.ajax({
            url: 'https://hanamineposapp.000webhostapp.com/Desarrollo/ServerScript/db.php',
            method: 'POST',
            dataType: 'json',
            success: function(response) {
                console.log('Respuesta del servidor:', response);
                alert(response.message);
            },
            error: function(xhr, status, error) {
                console.error('Error al conectar a la base de datos:', error);
                alert('Hubo un error al conectar a la base de datos');
            }
        });
    }
    testDBConnection();
});