<?php
// Habilitar CORS si estás haciendo una solicitud desde un dominio diferente
header("Access-Control-Allow-Origin: https://your-cordova-app-domain.com");
header("Access-Control-Allow-Credentials: true");

// Leer la cookie
if (isset($_COOKIE['cookieName'])) {
    $cookieValue = $_COOKIE['cookieName'];

    // Procesar la cookie, por ejemplo, autenticar al usuario
    // Aquí puedes poner la lógica que necesites
    if ($cookieValue === 'expectedValue') {
        $response = array('status' => 'success', 'message' => 'Cookie is valid');
    } else {
        $response = array('status' => 'error', 'message' => 'Invalid cookie');
    }
} else {
    $response = array('status' => 'error', 'message' => 'No cookie found');
}

// Enviar la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
