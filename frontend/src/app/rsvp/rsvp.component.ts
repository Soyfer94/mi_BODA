import { Component } from '@angular/core';
import { ConfirmacionService } from './confirmacion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { RsvpComponent } from './rsvp/rsvp.component';
//import { Confirmacion } from './confirmacion.model';
//import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent {
  nombre: string = '';
  dni: string = '';      
  email: string = '';    
  asistencia: boolean = true;
  comida: string = '';
  mensajeExito: string = '';

  constructor(private confirmacionService: ConfirmacionService) {}

  enviarConfirmacion() {
    const data = {
      nombre: this.nombre,
      dni: this.dni,
      email: this.email,
      asistencia: this.asistencia,
      comida: this.comida
    };

      this.confirmacionService.confirmar(data).subscribe({
      next: () => {
        this.mensajeExito = '🎉 ¡Gracias por confirmar tu asistencia!';
        this.limpiarFormulario();
        setTimeout(() => {
        this.mensajeExito = '';
        this.cerrar();
        }, 3000);
      },
      error: (err) => {
        console.error('Error en la confirmación:', err);
        const mensajeError = err.message || 'Error al enviar confirmación';
        alert(`Error: ${mensajeError}`);
      }
    });
  }


mostrarFormulario: boolean = false;

mostrar() {
  this.mostrarFormulario = true;
}

cerrar() {
  this.mostrarFormulario = false;
}

private limpiarFormulario() {
    this.nombre = '';
    this.dni = '';
    this.email = '';
    this.asistencia = true;
    this.comida = '';
  }

}