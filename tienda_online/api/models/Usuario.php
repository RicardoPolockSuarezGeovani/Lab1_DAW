<?php
require_once __DIR__ . '/../config/db.php';

class Usuario {
    private $conn;

    public function __construct() {
        global $conn;
        $this->conn = $conn;
    }

    public function registrar($nombre, $email, $contraseña) {
        // Hashea la contraseña antes de guardarla
        $hashed_password = password_hash($contraseña, PASSWORD_DEFAULT);

        // Prepara la consulta SQL
        $sql = "INSERT INTO usuarios (nombre, email, contraseña) VALUES (:nombre, :email, :contraseña)";
        $stmt = $this->conn->prepare($sql);

        // Ejecuta la consulta
        $stmt->execute([
            'nombre' => $nombre,
            'email' => $email,
            'contraseña' => $hashed_password
        ]);
    }
}
?>
