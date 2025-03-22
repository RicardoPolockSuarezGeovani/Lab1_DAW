<?php
require_once __DIR__ . '/../models/Producto.php';

class ProductoController {
    private $productoModel;

    public function __construct() {
        $this->productoModel = new Producto();
    }

    public function obtenerTodos() {
        $productos = $this->productoModel->obtenerTodos();
        echo json_encode($productos);
    }

    public function crear() {
        $data = json_decode(file_get_contents('php://input'), true);
        $this->productoModel->crear($data['nombre'], $data['descripcion'], $data['precio'], $data['stock']);
        echo json_encode(['mensaje' => 'Producto creado correctamente']);
    }

    public function actualizar($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $this->productoModel->actualizar($id, $data['nombre'], $data['descripcion'], $data['precio'], $data['stock']);
        echo json_encode(['mensaje' => 'Producto actualizado correctamente']);
    }

    public function eliminar($id) {
        $this->productoModel->eliminar($id);
        echo json_encode(['mensaje' => 'Producto eliminado correctamente']);
    }
}
?>
