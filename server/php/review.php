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
    $title = filter_var($_POST['title'], FILTER_SANITIZE_SPECIAL_CHARS);
    $text = filter_var($_POST['text'], FILTER_SANITIZE_SPECIAL_CHARS);
    $movieID = filter_var($_POST['movie'], FILTER_SANITIZE_SPECIAL_CHARS);
    $userID = filter_var($_POST['user'], FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_var($_POST['password'], FILTER_SANITIZE_SPECIAL_CHARS);

    // Iniciar la transacción
    $pdo->beginTransaction();

    // Insertar los datos en la tabla users
    $insertStmt = $pdo->prepare("
        INSERT INTO reviews (Title, Text, Score, Date, ID_User_FK, ID_Movie_FK) 
        VALUES ( :Title , :Text , :Score, :Date , :ID_User_FK, :ID_Movie_FK)
    ");
    
    $insertStmt->execute();

    // Confirmar la transacción
    $pdo->commit();

    echo json_encode(['status' => 'success', 'message' => 'Reseña Realizada']);

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
