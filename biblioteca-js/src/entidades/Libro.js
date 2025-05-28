import { formatearFechaFlecha } from '../helpers/funciones.js';

export class Libro {
  constructor(titulo, autor, isbn) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.disponible = true;
    this.fechaRegistro = new Date();
  }

  // Método tradicional
  prestar() {
    if (this.disponible) {
      this.disponible = false;
      return true;
    }
    return false;
  }

  // Método flecha
  devolver = () => {
    this.disponible = true;
    console.log(`Libro devuelto: ${this.titulo}`);
  };

  // Método que usa función helper flecha
  infoRegistro() {
    return `Registrado el: ${formatearFechaFlecha(this.fechaRegistro)}`;
  }

  // Getter tradicional
  get descripcion() {
    return `${this.titulo} - ${this.autor}`;
  }

  // Método estático con función flecha
  static crearLibroDemo = () => new Libro("Libro Demo", "Autor Demo", "000000");

  // PARTE 1: Nuevos métodos según la práctica
  
  // 1. Método flecha para días de préstamo
  diasPrestamo = () => this.disponible ? 0 : 15;
  
  // 2. Método tradicional para disponibilidad
  estaDisponible() {
    return this.disponible;
  }
  
  // 3. Método estático con arrow function para validar ISBN
  static validarISBN = (isbn) => /^\d{6}$/.test(isbn);
}