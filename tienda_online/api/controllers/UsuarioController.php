<?php
require_once __DIR__ . '/../models/Usuario.php';

class UsuarioController {
    private $usuarioModel;

    public function __construct() {
        $this->usuarioModel = new Usuario();
    }

    public function registrar() {
        // Obtiene los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);

        // Valida que los datos estén presentes
        if (empty($data['nombre']) || empty($data['email']) || empty($data['contraseña'])) {
            http_response_code(400); // Bad Request
            echo json_encode(['mensaje' => 'Todos los campos son obligatorios']);
            return;
        }

        // Registra el usuario
        $this->usuarioModel->registrar($data['nombre'], $data['email'], $data['contraseña']);

        // Respuesta exitosa
        echo json_encode(['mensaje' => 'Usuario registrado correctamente']);
    }
}
?>
