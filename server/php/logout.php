<?php
session_start();

// Lista de orígenes permitidos
$allowedOrigins = ['http://localhost', 'https://hanamiapp.000webhostapp.com'];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : ''; //Si no hay ningun origen, se asigna una cadena vacia

if (in_array($origin, $allowedOrigins)) { //Busca los elementos de origin dentr de allowedOrigins
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
} else if (strpos($origin, 'file://') === 0) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
}

header('Content-Type: application/json');

try {
    // Destruir todas las variables de sesión
    $_SESSION = array();

    // Si se desea destruir la sesión completamente, borrar también la cookie de sesión.
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Finalmente, destruir la sesión.
    session_destroy();

    echo json_encode(['status' => 'success', 'message' => 'Sesión cerrada correctamente.']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error al cerrar la sesión: ' . $e->getMessage()]);
}
?>
