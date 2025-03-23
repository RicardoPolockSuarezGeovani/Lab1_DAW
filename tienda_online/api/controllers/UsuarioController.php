<?php
require_once __DIR__ . '/../models/Usuario.php';

class UsuarioController {
    private $usuarioModel;

    public function __construct() {
        $this->usuarioModel = new Usuario();
    }

    public function registrar() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['nombre']) || empty($data['email']) || empty($data['contraseña'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Todos los campos son obligatorios']);
            return;
        }

        $this->usuarioModel->registrar($data['nombre'], $data['email'], $data['contraseña']);
        echo json_encode(['mensaje' => 'Usuario registrado exitosamente']);
    }

    public function login() {
        $data = json_decode(file_get_contents('php://input'), true);

        $usuario = $this->usuarioModel->obtenerPorEmail($data['email']);
        if ($usuario && password_verify($data['contraseña'], $usuario['contraseña'])) {
            echo json_encode(['mensaje' => 'Login exitoso']);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Credenciales inválidas']);
        }
    }
}
?>
