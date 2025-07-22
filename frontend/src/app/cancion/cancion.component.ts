import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.scss']
})
export class CancionComponent {
  formCancion: FormGroup;
  mostrarFormulario = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formCancion = this.fb.group({
      cancion: ['', Validators.required]
    });
  }

  enviarCancion() {
    if (this.formCancion.valid) {
      this.http.post('http://localhost:3000/api/canciones', this.formCancion.value)
        .subscribe({
          next: () => {
            alert('¡Gracias por tu sugerencia!');
            this.formCancion.reset();
            this.mostrarFormulario = false;
          },
          error: (error) => {
            console.error(error);
            alert('Hubo un error al enviar tu sugerencia.');
          }
        });
    }
  }
}