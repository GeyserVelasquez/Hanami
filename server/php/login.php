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

// Configuración de la conexión a la base de datos
$dsn = 'mysql:host=localhost;dbname=hanami';
$username = 'root';
$password = '';

try {
    // Conexión a la base de datos
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Datos recibidos del formulario y sanitización
    $userName = filter_var($_POST['UserName'], FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_var($_POST['Password'], FILTER_SANITIZE_SPECIAL_CHARS);

    // Verificar las credenciales del usuario
    $stmt = $pdo->prepare("SELECT * FROM users WHERE UserName = ?");
    $stmt->execute([$userName]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['Password'])) {
        // Iniciar sesión y guardar los datos del usuario en la sesión
        $_SESSION['user_id'] = $user['ID_User'];
        $_SESSION['user_name'] = $user['UserName'];
        $_SESSION['user_role'] = $user['ID_Rol_FK'];

        echo json_encode(['status' => 'success', 'message' => 'Sesión Iniciada Correctamente.', 'user_id' => $user['ID_User']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Nombre de usuario o contraseña incorrectos.']);
    }
} catch (Exception $e) {
    // Manejo de errores
    echo json_encode(['status' => 'error', 'message' => 'Error al procesar los datos: ' . $e->getMessage()]);
} finally {
    // Cierre de la conexión
    $pdo = null;
}
