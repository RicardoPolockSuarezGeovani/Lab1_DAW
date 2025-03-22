<?php
require_once __DIR__ . '/../config/db.php';

class Producto {
    private $conn;

    public function __construct() {
        global $conn;
        $this->conn = $conn;
    }

    public function crear($nombre, $descripcion, $precio, $stock) {
        $sql = "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (:nombre, :descripcion, :precio, :stock)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['nombre' => $nombre, 'descripcion' => $descripcion, 'precio' => $precio, 'stock' => $stock]);
    }

    public function obtenerTodos() {
        $sql = "SELECT * FROM productos";
        $stmt = $this->conn->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function actualizar($id, $nombre, $descripcion, $precio, $stock) {
        $sql = "UPDATE productos SET nombre = :nombre, descripcion = :descripcion, precio = :precio, stock = :stock WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id, 'nombre' => $nombre, 'descripcion' => $descripcion, 'precio' => $precio, 'stock' => $stock]);
    }

    public function eliminar($id) {
        $sql = "DELETE FROM productos WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
    }
}
?>
