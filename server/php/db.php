<?php
$allowedOrigins = ['http://localhost', 'https://hanamineposapp.000webhostapp.com'];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
} else if (strpos($origin, 'file://') === 0) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
}

header('Content-Type: application/json');

$dsn = 'mysql:host=localhost;dbname=hanami';
$username = 'root';
$password = '';

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo json_encode(["message" => "Conexion a la base de datos establecida correctamente"]);
} catch (PDOException $e) {
    echo json_encode(["message" => "Error al conectar a la base de datos: " . $e->getMessage()]);
} finally {
    $pdo = null;
}