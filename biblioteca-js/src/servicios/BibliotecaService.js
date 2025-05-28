import { Libro } from '../entidades/Libro.js';
import { Usuario } from '../entidades/Usuario.js';
import { Prestamo } from '../entidades/Prestamo.js';
import { formatearFechaTradicional } from '../helpers/funciones.js';

export class BibliotecaService {
  constructor() {
    this.libros = [];
    this.usuarios = [];
    this.prestamos = [];
    this.inicioSistema = new Date();
  }

  // Función tradicional
  agregarLibro(titulo, autor, isbn) {
    if (!Libro.validarISBN(isbn)) {
      throw new Error('ISBN inválido: debe tener exactamente 6 dígitos');
    }
    const libro = new Libro(titulo, autor, isbn);
    this.libros.push(libro);
    return libro;
  }

  // Función flecha asignada a propiedad
  registrarUsuario = (nombre, id) => {
    const usuario = new Usuario(nombre, id);
    this.usuarios.push(usuario);
    return usuario;
  };

  // Método que usa función tradicional externa
  infoSistema() {
    return `Sistema iniciado el: ${formatearFechaTradicional(this.inicioSistema)}`;
  }

  // Método con callback tradicional
  buscarLibroPorTitulo(titulo, callback) {
    const resultado = this.libros.filter(function(libro) {
      return libro.titulo.toLowerCase().includes(titulo.toLowerCase());
    });
    callback(resultado);
  }

  // Método con callback flecha
  buscarUsuarioPorNombre(nombre, callback) {
    const resultado = this.usuarios.filter(user => 
      user.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    callback(resultado);
  }

  // Arrow function para registrar préstamo
  registrarPrestamo = (libroId, usuarioId) => {
    const libro = this.libros.find(l => l.isbn === libroId);
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    
    if (!libro || !usuario) {
      throw new Error('Libro o usuario no encontrado');
    }
    
    if (!libro.estaDisponible()) {
      throw new Error('El libro no está disponible');
    }
    
    libro.prestar();
    const prestamo = new Prestamo(libro, usuario, new Date());
    this.prestamos.push(prestamo);
    return prestamo;
  };
  
  // Método tradicional con callback
  buscarPrestamosPorUsuario(usuarioId, callback) {
    const resultados = this.prestamos.filter(function(prestamo) {
      return prestamo.usuario.id === usuarioId;
    });
    callback(resultados);
  }
  
  // Arrow function con reduce para calcular multas
  calcularMultasPendientes = () => {
    return this.prestamos.reduce((total, prestamo) => {
      return total + (prestamo.multa > 0 && !prestamo.pagado ? prestamo.multa : 0);
    }, 0);
  };
}