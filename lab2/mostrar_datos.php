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

// Paginación
$registros_por_pagina = 5;
$pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
$offset = ($pagina - 1) * $registros_por_pagina;

// Consultar datos con paginación
$sql = "SELECT id, nombre, correo, edad FROM usuarios LIMIT $registros_por_pagina OFFSET $offset";
$result = $conn->query($sql);

// Mostrar datos
if ($result->num_rows > 0) {
    echo "<h1>Usuarios Registrados</h1>";
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>Nombre</th><th>Email</th><th>Edad</th><th>Acciones</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row["id"] . "</td>";
        echo "<td>" . $row["nombre"] . "</td>";
        echo "<td>" . $row["correo"] . "</td>";
        echo "<td>" . $row["edad"] . "</td>";
        echo "<td>
                <a href='editar_usuario.php?id=" . $row["id"] . "'>Editar</a> |
                <a href='eliminar_usuario.php?id=" . $row["id"] . "' onclick='return confirm(\"¿Estás seguro?\")'>Eliminar</a>
              </td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "No hay usuarios registrados.";
}

// Mostrar enlaces de paginación
$sql_total = "SELECT COUNT(*) as total FROM usuarios";
$result_total = $conn->query($sql_total);
$row_total = $result_total->fetch_assoc();
$total_paginas = ceil($row_total['total'] / $registros_por_pagina);

echo "<div class='paginacion'>";
for ($i = 1; $i <= $total_paginas; $i++) {
    echo "<a href='mostrar_datos.php?pagina=$i'>$i</a> ";
}
echo "</div>";

$conn->close();
?>