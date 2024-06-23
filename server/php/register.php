<?php
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
        throw new Exception('Correo electrónico no válido.');
    }

    // Iniciar la transacción
    $pdo->beginTransaction();

    // Verificar si el correo ya existe
    $emailCheckStmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE Mail = ?");
    $emailCheckStmt->execute([$mail]);
    if ($emailCheckStmt->fetchColumn() > 0) {
        throw new Exception('El correo electrónico ya está registrado.');
    }

    // Verificar si el nombre de usuario ya existe
    $userNameCheckStmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE UserName = ?");
    $userNameCheckStmt->execute([$userName]);
    if ($userNameCheckStmt->fetchColumn() > 0) {
        throw new Exception('El nombre de usuario ya está en uso.');
    }

    // Insertar los datos en la tabla users
    $insertStmt = $pdo->prepare("
        INSERT INTO users (ID_Rol_FK, UserName, FirstName, LastName, Password, Mail, Genero, ) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $insertStmt->execute([$rol, $userName, $firstName, $lastName, $password, $mail, $genero]);

    // Confirmar la transacción
    $pdo->commit();

    echo "Datos recibidos correctamente.";

} catch (Exception $e) {
    // Revertir la transacción en caso de error
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    // Manejo de errores
    echo "Error al procesar los datos: " . $e->getMessage();
} finally {
    // Cierre de la conexión
    $pdo = null;
}
?>
