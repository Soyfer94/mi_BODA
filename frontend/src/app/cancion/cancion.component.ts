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
  animacionesIniciadas = false;

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

  /*---------- movimiento reveal--------------------- */


  
ngAfterViewInit() {
  // Hacer scroll suave al contenido principal
  setTimeout(() => {
    const destino = document.getElementById("inicio");
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }

    // Esperar un poco más para asegurar que Angular renderizó todo
    setTimeout(() => this.iniciarAnimacionesReveal(), 100);
      }, 100);
      
    }



   iniciarAnimacionesReveal() {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  }


}