// $(document).ready(function () {
//     // Verificar si hay una sesión activa al cargar la página
//     $.ajax({
//         type: 'GET',
//         url: 'https://hanamiapp.000webhostapp.com/ServerScript/session_check.php',
//         dataType: 'json',
//         xhrFields: {
//             withCredentials: true
//         },
//         success: function (response) {
//             if (response.status === 'success') {
//                 // Redirigir a main.html si hay una sesión activa
//                 alert(window.location.href);
//                 window.location.href = "main.html";
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error('Error al verificar la sesión:', error);
//         }
//     })
// });

try {
    // Código que puede lanzar una excepción
} catch (error) {
    // Código para manejar la excepción
} finally {
    // Código que se ejecutará siempre, haya ocurrido una excepción o no
}

try {
    // Intentamos ejecutar este código
    let resultado = 10 / 0;
    console.log("El resultado es: " + resultado);
} catch (error) {
    // Si hay una excepción, se maneja aquí
    console.error("Ocurrió un error: " + error.message);
} finally {
    // Este código se ejecuta siempre
    console.log("Bloque finally ejecutado.");
}

// Simulamos una función para leer un archivo JSON
function leerArchivoJson(nombreArchivo) {
    if (nombreArchivo !== 'datos.json') {
        throw new Error('Archivo no encontrado');
    }
    // Simulamos el contenido del archivo JSON
    return '{"nombre": "Juan", "edad": 30}';
}

try {
    let nombreArchivo = 'datos.json';
    let contenido = leerArchivoJson(nombreArchivo); // Intentamos leer un archivo JSON
    console.log("Archivo leído exitosamente: " + contenido);

    let datos = JSON.parse(contenido); // Intentamos parsear el contenido JSON
    console.log("Datos parseados: ", datos);

    if (!datos.direccion) {  // Intentamos acceder a una propiedad que podría no existir
        throw new Error('La dirección no está definida en los datos');
    }
    console.log("Dirección: " + datos.direccion);

} catch (error) {  // Si ocurre algún error, lo manejamos aquí
    console.error("Ocurrió un error: " + error.message);

} finally { // Este bloque se ejecuta siempre
    notificarLectura()
    console.log("Finalizando operación de lectura y parseo de archivo.");
}


