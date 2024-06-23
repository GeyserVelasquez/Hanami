<?php
session_start();

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
        // $_SESSION['user_id'] = $user['ID_User'];
        // $_SESSION['user_name'] = $user['UserName'];
        // $_SESSION['user_role'] = $user['ID_Rol_FK'];

        echo json_encode(['status' => 'success', 'message' => 'Sesion Iniciada Correctamente.']);
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
