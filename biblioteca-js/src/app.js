import { BibliotecaService } from './servicios/BibliotecaService.js';
import { mostrarInfoFlecha } from './helpers/funciones.js';

// Demostración función helper
console.log(mostrarInfoFlecha());

// Crear instancia del servicio
const biblioteca = new BibliotecaService();
console.log(biblioteca.infoSistema());

// Agregar datos de prueba
biblioteca.agregarLibro("Cien años de soledad", "García Márquez", "123456");
biblioteca.agregarLibro("El principito", "Antoine de Saint-Exupéry", "654321");
biblioteca.registrarUsuario("Ana Torres", "001");
biblioteca.registrarUsuario("Juan Pérez", "002");

// 1. Simular un préstamo
console.log("\n=== Simulación de préstamo ===");
const prestamo = biblioteca.registrarPrestamo("123456", "001");
console.log(prestamo.infoPrestamo());

// 2. Simular devolución después de 20 días (con retraso)
console.log("\n=== Simulación de devolución ===");
const fechaPrestamo = new Date();
const fechaDevolucionSimulada = new Date(fechaPrestamo);
fechaDevolucionSimulada.setDate(fechaPrestamo.getDate() + 20); // 20 días después

// Usar registrarDevolucion() en lugar de asignación directa
prestamo.fechaDevolucion = fechaDevolucionSimulada;
const multa = prestamo.registrarDevolucion(); // Esto actualiza la multa en el objeto

console.log(`Días de retraso: ${prestamo._diasTranscurridos() - 15}`);
console.log(`Multa por retraso: $${multa}`);
console.log(prestamo.infoPrestamo());

// 3. Buscar préstamos por usuario con callback tradicional
console.log("\n=== Búsqueda de préstamos por usuario ===");
biblioteca.buscarPrestamosPorUsuario("001", function(resultados) {
  console.log(`Préstamos encontrados para el usuario 001: ${resultados.length}`);
  resultados.forEach(p => console.log(p.infoPrestamo()));
});

// 4. Calcular multas totales
console.log("\n=== Cálculo de multas pendientes ===");
const totalMultas = biblioteca.calcularMultasPendientes();
console.log(`Total de multas pendientes: $${totalMultas}`);