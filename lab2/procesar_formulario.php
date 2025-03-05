<?php
// Conectar a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "formulario_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Validar datos del formulario
$errores = [];

if (empty($_POST['nombre'])) {
    $errores[] = "El nombre es obligatorio.";
}

if (empty($_POST['email'])) {
    $errores[] = "El email es obligatorio.";
} elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errores[] = "El email no tiene un formato válido.";
}

if (empty($_POST['edad'])) {
    $errores[] = "La edad es obligatoria.";
} elseif ($_POST['edad'] < 0) {
    $errores[] = "La edad debe ser un número positivo.";
}

// Si hay errores, mostrarlos
if (!empty($errores)) {
    foreach ($errores as $error) {
        echo "<p style='color: red;'>$error</p>";
    }
} else {
    // Insertar datos en la base de datos
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $edad = $_POST['edad'];

    $sql = "INSERT INTO usuarios (nombre, correo, edad) VALUES ('$nombre', '$email', $edad)";
    if ($conn->query($sql) === TRUE) {
        echo "Registro exitoso.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>