document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.toggle');
    const checkbox = document.getElementById('menu-toggle');

    toggle.addEventListener('click', function() {
        checkbox.checked = !checkbox.checked;
    });
});


