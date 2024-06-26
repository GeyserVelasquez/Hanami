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
    $firstName = filter_var($_POST['FirstName'], FILTER_SANITIZE_SPECIAL_CHARS);
    $lastName = filter_var($_POST['LastName'], FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_var($_POST['Password'], FILTER_SANITIZE_SPECIAL_CHARS);
    $mail = filter_var($_POST['Mail'], FILTER_SANITIZE_EMAIL);
    $genero = filter_var($_POST['Genero'], FILTER_SANITIZE_SPECIAL_CHARS);
    $rol = 2;

    // Validación del correo electrónico
    if (filter_var($mail, FILTER_VALIDATE_EMAIL) === false) {
        echo json_encode(['status' => 'error', 'message' => 'Correo electrónico no válido.']);
        exit();
    }

    // Hash de la contraseña usando bcrypt
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Iniciar la transacción
    $pdo->beginTransaction();

    // Verificar si el correo ya existe
    $emailCheckStmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE Mail = ?");
    $emailCheckStmt->execute([$mail]);
    
    if ($emailCheckStmt->fetchColumn() > 0) {
        echo json_encode(['status' => 'error', 'message' => 'El correo electrónico ya está registrado.']);
        exit();
    }

    // Verificar si el nombre de usuario ya existe
    $userNameCheckStmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE UserName = ?");
    $userNameCheckStmt->execute([$userName]);
    if ($userNameCheckStmt->fetchColumn() > 0) {
        echo json_encode(['status' => 'error', 'message' => 'El nombre de usuario ya está en uso.']);
        exit();
    }

    // Insertar los datos en la tabla users
    $insertStmt = $pdo->prepare("
        INSERT INTO users (ID_Rol_FK, UserName, FirstName, LastName, Password, Mail, Genero) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $insertStmt->execute([$rol, $userName, $firstName, $lastName, $hashedPassword, $mail, $genero]);

    // Confirmar la transacción
    $pdo->commit();

    echo json_encode(['status' => 'success', 'message' => 'Datos recibidos correctamente.']);

} catch (Exception $e) {
    // Revertir la transacción en caso de error
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    // Manejo de errores
    echo json_encode(['status' => 'error', 'message' => 'Error al procesar los datos: ' . $e->getMessage()]);
} finally {
    // Cierre de la conexión
    $pdo = null;
}
