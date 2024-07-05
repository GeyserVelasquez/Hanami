<?php
session_start();
date_default_timezone_set('America/Caracas');

// Lista de orígenes permitidos
$allowedOrigins = ['http://localhost', 'https://hanamiapp.000webhostapp.com'];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : ''; // Si no hay ningún origen, se asigna una cadena vacía

if (in_array($origin, $allowedOrigins)) { // Busca los elementos de origin dentro de allowedOrigins
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
    $title = filter_var($_POST['Title'], FILTER_SANITIZE_SPECIAL_CHARS);
    $text = filter_var($_POST['Text'], FILTER_SANITIZE_SPECIAL_CHARS);
    $score = filter_var($_POST['Score'], FILTER_SANITIZE_SPECIAL_CHARS);
    $id_User_FK = filter_var($_POST['ID_User_FK'], FILTER_SANITIZE_SPECIAL_CHARS);
    $id_Movie_FK = filter_var($_POST['ID_Movie_FK'], FILTER_SANITIZE_SPECIAL_CHARS);
    
    // Crear array asociativo con los datos
    $data = [
        ':Title' => $title,
        ':Text' => $text,
        ':Score' => $score,
        ':ID_User_FK' => $id_User_FK,
        ':ID_Movie_FK' => $id_Movie_FK
    ];

    // Iniciar la transacción
    $pdo->beginTransaction();

    // Insertar los datos en la tabla reviews
    $insertStmt = $pdo->prepare("
        INSERT INTO `reviews` (`Title`, `Text`, `Score`, `ID_User_FK`, `ID_Movie_FK`) VALUES (:Title, :Text, :Score, :ID_User_FK, :ID_Movie_FK)
    ");

    $insertStmt->execute($data);

    // Confirmar la transacción
    $pdo->commit();

    echo json_encode(['status' => 'success', 'message' => 'Reseña Reseñada B)']);

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
