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
  asistencia: boolean = true;
  comida: string = '';

  constructor(private confirmacionService: ConfirmacionService) {}

  enviarConfirmacion() {
    const data = {
      nombre: this.nombre,
      asistencia: this.asistencia,
      comida: this.comida
    };

      this.confirmacionService.confirmar(data).subscribe({
      next: () => alert('¡Confirmación enviada!'),
      error: (err) => {
        console.error('Error en la confirmación:', err);
        // Puedes usar un mensaje más específico si el error tiene un campo 'message'
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

}