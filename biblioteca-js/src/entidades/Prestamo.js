export class Prestamo {
  constructor(libro, usuario, fechaPrestamo) {
    this.libro = libro;
    this.usuario = usuario;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = null;
    this.multa = 0;
    this.pagado = false;
  }

  // Método tradicional para registrar devolución
  registrarDevolucion() {
    if (!this.fechaDevolucion) {
      this.fechaDevolucion = new Date();
    }
    this.libro.disponible = true;
    this.multa = this.calcularMulta(); // Asegura que se actualice la multa
    return this.multa;
  }

  // Arrow function para calcular multa
  calcularMulta = () => {
    if (!this.fechaDevolucion) return 0;
    const diasRetraso = this._diasTranscurridos() - 15;
    return diasRetraso > 0 ? diasRetraso * 2 : 0;
  };

  // Función tradicional privada (por convención)
  _diasTranscurridos() {
    const fechaFin = this.fechaDevolucion || new Date();
    const diff = fechaFin - this.fechaPrestamo;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  // Método con arrow function interna
  infoPrestamo() {
    const estado = () => {
      if (!this.fechaDevolucion) return 'En préstamo';
      if (this.multa > 0 && !this.pagado) return 'Devuelto con multa pendiente';
      if (this.multa > 0 && this.pagado) return 'Devuelto con multa pagada';
      return 'Devuelto a tiempo';
    };
    
    return `Préstamo de "${this.libro.titulo}" a ${this.usuario.nombre}:
    - Fecha préstamo: ${this.fechaPrestamo.toLocaleDateString()}
    - Fecha devolución: ${this.fechaDevolucion?.toLocaleDateString() || 'No devuelto'}
    - Multa: $${this.multa}
    - Estado: ${estado()}`;
  }
}