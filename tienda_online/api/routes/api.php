<?php
require_once __DIR__ . '/../controllers/UsuarioController.php';
require_once __DIR__ . '/../controllers/ProductoController.php';

$usuarioController = new UsuarioController();
$productoController = new ProductoController();

$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$base_path = '/tienda_online/api';
$request_uri = str_replace($base_path, '', $request_uri);

// Endpoints de Usuarios
if ($request_uri === '/registrar' && $request_method === 'POST') {
    $usuarioController->registrar();
} elseif ($request_uri === '/login' && $request_method === 'POST') {
    $usuarioController->login();

// Endpoints de Productos
} elseif ($request_uri === '/productos' && $request_method === 'GET') {
    $productoController->obtenerTodos();
} elseif ($request_uri === '/productos' && $request_method === 'POST') {
    $productoController->crear();
} elseif (preg_match('/^\/productos\/(\d+)$/', $request_uri, $matches)) {
    $id = $matches[1];
    if ($request_method === 'PUT') {
        $productoController->actualizar($id);
    } elseif ($request_method === 'DELETE') {
        $productoController->eliminar($id);
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Ruta no encontrada']);
}
?>
