$(document).ready(function () {
    $('#logoutButton').on('click', function (e) {
        e.preventDefault();
        localStorage.removeItem("ID_User");
        Swal.fire({
            title: "Sesión Cerrada",
            timer: 2000,
            text: "Se ha cerrado su sesion",
            icon: "success"
          }).then( () => {
            window.location.href = "index.html";
          });

    });
});