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
    $stmt = $pdo->prepare("SELECT ID_User ID, UserName , CONCAT_WS(' ', FirstName, LastName) Nombre FROM users WHERE UserName LIKE ? LIMIT 25");
    $stmt->execute(["%$searchTerm%"]); 
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Formato de salida para Select2
    $results = array_map(function ($user) {
        return [
            'ID' => $user['ID'],
            'User' => $user['UserName'],
            'Nombre' => $user['Nombre']
        ];
    }, $users);

    echo json_encode(['results' => $results]);
} catch (Exception $e) {
    // Manejo de errores
    echo json_encode(['status' => 'error', 'message' => 'Error al procesar los datos: ' . $e->getMessage()]);
} finally {
    // Cierre de la conexión
    $pdo = null;
}
?>
