document.addEventListener('DOMContentLoaded', function () {
    const toggleBottomCanvas = document.getElementById('toggleBottomCanvas');
    const offcanvasBottom = new bootstrap.Offcanvas(document.getElementById('offcanvasBottom'));

    toggleBottomCanvas.addEventListener('click', function (event) {
        event.stopPropagation(); // Evitar que el clic cierre el offcanvas padre
        offcanvasBottom.show(); // Mostrar el offcanvas hijo
    });
});
