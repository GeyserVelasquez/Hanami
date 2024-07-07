$(document).ready(function () {
    const toggleBottomCanvas = document.getElementById('btn-action');
    const offcanvasBottom = new bootstrap.Offcanvas(document.getElementById('actionDetails'));

    toggleBottomCanvas.addEventListener('click', function (event) {
        event.stopPropagation(); // Evitar que el clic cierre el offcanvas padre
        offcanvasBottom.show(); // Mostrar el offcanvas hijo
    });
});
