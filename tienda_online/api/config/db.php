<?php
$host = 'localhost';
$dbname = 'tienda_online';
$username = 'root';
$password = ''; // Deja vacío si no tienes contraseña

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>
