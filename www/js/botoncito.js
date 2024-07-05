import Swal from '../../node_modules/sweetalert2/sweetalert2.d.ts';

$("botoncito").on('click', function () {
    Swal.fire({
        title: 'Hello World!',
        text: 'This is a SweetAlert2 alert',
        icon: 'success',
        confirmButtonText: 'Cool'
    });
});

