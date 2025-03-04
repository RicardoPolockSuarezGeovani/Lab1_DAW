 <?php
 $servidor = "localhost";
 $usuario = "root";
 $password = "";
 $base_datos = "usuarios_bd";
 
 //Crear Conexion
 $conexion = new mysqli($servidor, $usuario, $password, $base_datos);
// Verificar conexión
if ($conexion->connect_error) {
		die("Error en la conexión: " . $conexion->connect_error);
	} else {
		echo "Conexión exitosa a la base de datos.";
	}
?>

