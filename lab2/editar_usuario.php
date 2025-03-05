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

// Obtener el ID del usuario a editar
$id = $_GET['id'];

// Obtener datos del usuario
$sql = "SELECT * FROM usuarios WHERE id = $id";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

// Actualizar datos si se envía el formulario
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $edad = $_POST['edad'];

    $sql = "UPDATE usuarios SET nombre='$nombre', correo='$email', edad=$edad WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo "Registro actualizado correctamente.";
    } else {
        echo "Error al actualizar: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Usuario</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Editar Usuario</h1>
    <form method="POST">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value="<?php echo $row['nombre']; ?>" required><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="<?php echo $row['correo']; ?>" required><br><br>

        <label for="edad">Edad:</label>
        <input type="number" id="edad" name="edad" value="<?php echo $row['edad']; ?>" required><br><br>

        <button type="submit">Guardar Cambios</button>
    </form>
</body>
</html>

<?php
$conn->close();
?>
