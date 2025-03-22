<<?php
// Mensaje de bienvenida para la raíz de la API
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/tienda_online/api/') {
    echo json_encode([
        'mensaje' => 'Bienvenido a la API de la tienda online',
        'endpoints' => [
            'POST /registrar' => 'Registrar un nuevo usuario',
            'POST /login' => 'Autenticar un usuario',
            'GET /productos' => 'Obtener todos los productos',
            'POST /productos' => 'Crear un nuevo producto',
            'PUT /productos/{id}' => 'Actualizar un producto',
            'DELETE /productos/{id}' => 'Eliminar un producto'
        ]
    ]);
    exit;
}

// Incluye el archivo de rutas
require_once __DIR__ . '/routes/api.php';
?>
