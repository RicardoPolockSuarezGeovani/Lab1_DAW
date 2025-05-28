import { BibliotecaService } from './servicios/BibliotecaService.js';
import { Libro } from './entidades/Libro.js';
import { Usuario } from './entidades/Usuario.js';
import { Prestamo } from './entidades/Prestamo.js';

// Pruebas para la clase Libro
function testLibro() {
  console.log("\n=== Probando clase Libro ===");
  const libro = new Libro("El señor de los anillos", "J.R.R. Tolkien", "111111");
  
  // Test método estático validarISBN
  console.assert(Libro.validarISBN("123456") === true, "ISBN válido (6 dígitos)");
  console.assert(Libro.validarISBN("12345") === false, "ISBN inválido (5 dígitos)");
  
  // Test disponibilidad
  console.assert(libro.estaDisponible() === true, "Libro disponible inicialmente");
  
  // Test préstamo
  libro.prestar();
  console.assert(libro.estaDisponible() === false, "Libro no disponible después de prestar");
  console.assert(libro.diasPrestamo() === 15, "Días de préstamo correctos (15)");
  
  // Test devolución
  libro.devolver();
  console.assert(libro.estaDisponible() === true, "Libro disponible después de devolver");
  console.assert(libro.diasPrestamo() === 0, "Días de préstamo correctos (0 cuando está disponible)");
  
  console.log("✅ Pruebas de Libro completadas");
}

// Ejecutar todas las pruebas
(async () => {
  console.log("Iniciando pruebas...");
  testLibro();
  console.log("\nTodas las pruebas completadas");
})();