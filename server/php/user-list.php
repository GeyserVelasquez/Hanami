<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Configuración de la conexión a la base de datos
$dsn = 'mysql:host=localhost;dbname=id22338061_hanami';
$username = 'id22338061_root';
$password = 'pasenRepo123.';

try {
    // Conexión a la base de datos
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Datos recibidos del formulario y sanitización
    $searchTerm = $_GET['q']; // Término de búsqueda enviado por Select2

    // Consulta SQL para buscar usuarios por nombre de usuario
    $stmt = $pdo->prepare("SELECT ID_User as id,  CONCAT_WS(' ', FirstName, LastName) as text FROM users WHERE UserName LIKE ? LIMIT 25");
    $stmt->execute(["%$searchTerm%"]); 
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Formato de salida para Select2
    $results = ['results' => $users];

    // Crear el archivo JSON
    $jsonFilePath = 'filename.json'; // Cambia 'path/to/your/json/filename.json' por la ruta y nombre del archivo JSON
    file_put_contents($jsonFilePath, json_encode($results, JSON_PRETTY_PRINT));

    // Devolver el JSON como respuesta
    echo json_encode($results, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    // Manejo de errores
    echo json_encode(['status' => 'error', 'message' => 'Error al procesar los datos: ' . $e->getMessage()]);
} finally {
    // Cierre de la conexión
    $pdo = null;
}
?>
