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

// Obtener el ID del usuario a eliminar
$id = $_GET['id'];

// Eliminar el registro
$sql = "DELETE FROM usuarios WHERE id = $id";
if ($conn->query($sql) === TRUE) {
    echo "Registro eliminado correctamente.";
} else {
    echo "Error al eliminar: " . $conn->error;
}

$conn->close();
?>
