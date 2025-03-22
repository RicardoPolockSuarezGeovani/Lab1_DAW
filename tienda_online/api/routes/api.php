<?php
require_once __DIR__ . '/../controllers/UsuarioController.php';
require_once __DIR__ . '/../controllers/ProductoController.php';

$usuarioController = new UsuarioController();
$productoController = new ProductoController();

$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];

// Elimina la parte base de la URL si es necesario
$base_path = '/tienda_online/api';
$request_uri = str_replace($base_path, '', $request_uri);

// Define las rutas
if ($request_uri === '/registrar' && $request_method === 'POST') {
    $usuarioController->registrar();
} elseif ($request_uri === '/usuarios' && $request_method === 'GET') {
    $usuarioController->obtenerTodos();
} elseif ($request_uri === '/productos' && $request_method === 'GET') {
    $productoController->obtenerTodos();
} elseif ($request_uri === '/productos' && $request_method === 'POST') {
    $productoController->crear();
} elseif (preg_match('/\/productos\/(\d+)/', $request_uri, $matches)) {
    $id = $matches[1];
    if ($request_method === 'PUT') {
        $productoController->actualizar($id);
    } elseif ($request_method === 'DELETE') {
        $productoController->eliminar($id);
    } else {
        http_response_code(405); // Método no permitido
        echo json_encode(['mensaje' => 'Método no permitido']);
    }
} else {
    http_response_code(404); // Ruta no encontrada
    echo json_encode(['mensaje' => 'Ruta no encontrada']);
}
?>
