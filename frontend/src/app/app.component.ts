import { Component, HostListener } from '@angular/core';
//import { RsvpComponent } from './rsvp/rsvp.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // <-- Importá HttpClientModule
import { CommonModule } from '@angular/common'; // 👈 Asegurate de importar esto
import { CancionComponent } from '../app/cancion/cancion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, RouterOutlet, HttpClientModule, CommonModule, CancionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // Usá `.css` si no estás usando SASS
})


//@Component({
 // selector: 'app-home',
 // standalone: true,
 // imports: [CancionComponent],
 // templateUrl: './app.component.html',
 // styleUrls: ['./app.component.scss'],
//})
//export class HomeComponent {}


export class AppComponent {
  title = 'Tarjeta de boda';
  

// ⏳ Contador regresivo
  dias: number = 0;
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;

  // 🖼️ Carrusel de fotos
  fotos: string[] = [
    '/assets/imagenes/foto1.JPG',
    '/assets/imagenes/foto2.JPG',
    '/assets/imagenes/foto3.JPG',
    '/assets/imagenes/foto4.JPG',
    '/assets/imagenes/foto5.JPG',
    '/assets/imagenes/foto6.JPEG'
  ];
  fotosMostradas: string[] = [];
  indice: number = 0; // Índice de la primera foto mostrada en el carrusel de miniaturas
  fotoSeleccionada: string | null = null;
  indiceFotoModal: number = -1; // Nuevo: Índice de la foto actual en el modal

  // 📍 Estados de visibilidad para nubes

  mostrarNubeDressCode = false;
  mostrarNubeMusica = false;
  mostrarNubeInfo = false;

  constructor() {
    this.iniciarContador();
    this.actualizarCarrusel();
  }

  // Hook para controlar el scroll del body cuando el modal está abierto
  @HostListener('document:body', ['$event'])
  onDocumentClick(event: Event) {
    if (this.fotoSeleccionada) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }


  // 📆 Contador hasta la boda

  iniciarContador() {
    setInterval(() => {
      // Usamos la fecha actual en Argentina (GMT-3)
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60000; // Offset en milisegundos para la zona horaria local
      const localNow = new Date(now.getTime() - offset); // Hora local en UTC para cálculo

      const fechaBoda = new Date('2025-09-27T00:00:00-03:00'); // Fecha de la boda con offset de Tucumán
      const diferencia = fechaBoda.getTime() - localNow.getTime();

      if (diferencia > 0) {
        this.dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        this.horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        this.minutos = Math.floor((diferencia / (1000 * 60)) % 60);
        this.segundos = Math.floor((diferencia / 1000) % 60);
      } else {
        this.dias = this.horas = this.minutos = this.segundos = 0;
      }
    }, 1000);
  }

  // 🎠 Carrusel
  anterior() {
    this.indice = (this.indice - 1 + this.fotos.length) % this.fotos.length;
    this.actualizarCarrusel();
  }

  siguiente() {
    this.indice = (this.indice + 1) % this.fotos.length;
    this.actualizarCarrusel();
  }

  actualizarCarrusel() {
    // Aseguramos que siempre haya 3 fotos mostradas, o ajustamos si hay menos de 3
    const numFotos = this.fotos.length;
    if (numFotos === 0) {
      this.fotosMostradas = [];
      return;
    }

    if (numFotos < 3) {
      // Si hay menos de 3 fotos, mostramos todas las que haya
      this.fotosMostradas = [...this.fotos];
    } else {
      // Si hay 3 o más, mostramos 3
      this.fotosMostradas = [
        this.fotos[this.indice],
        this.fotos[(this.indice + 1) % numFotos],
        this.fotos[(this.indice + 2) % numFotos]
      ];
    }
  }

// 📸 Lógica del Modal
  abrirModal(foto: string) {
    this.fotoSeleccionada = foto;
    // Encontramos el índice de la foto seleccionada para la navegación del modal
    this.indiceFotoModal = this.fotos.indexOf(foto);
  }

  cerrarModal() {
    this.fotoSeleccionada = null;
    this.indiceFotoModal = -1; // Resetear el índice del modal al cerrar
  }


  modalAnterior() {
    if (this.indiceFotoModal > -1) {
      this.indiceFotoModal = (this.indiceFotoModal - 1 + this.fotos.length) % this.fotos.length;
      this.fotoSeleccionada = this.fotos[this.indiceFotoModal];
    }
  }

  modalSiguiente() {
    if (this.indiceFotoModal > -1) {
      this.indiceFotoModal = (this.indiceFotoModal + 1) % this.fotos.length;
      this.fotoSeleccionada = this.fotos[this.indiceFotoModal];
    }
  }
}