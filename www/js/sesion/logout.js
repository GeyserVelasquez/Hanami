$(document).ready(function () {
    $('#logoutButton').on('click', function (e) {
        e.preventDefault();
        // $.ajax({
        //     type: 'POST',
        //     url: 'https://hanamiapp.000webhostapp.com/ServerScript/logout.php',
        //     dataType: 'json',
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     success: function (response) {
        //         alert(response.message);
        //         if (response.status === 'success') {
        //             window.location.href = "index.html";
        //         }
        //     },
        //     error: function (xhr, status, error) {
        //         console.error('Error al enviar los datos:', error);
        //         alert('Hubo un error al cerrar sesión. Por favor, inténtalo de nuevo.');
        //     }
        // });
        localStorage.removeItem("ID_User");
        console.log()
        Swal.fire({
            title: "Sesión Cerrada",
            timer: 2000,
            text: "Se ha cerrado su sesion "+ localStorage.getItem("ID_User"),
            icon: "success"
          }).then( () => {
            window.location.href = "index.html";
          });

    });
});
