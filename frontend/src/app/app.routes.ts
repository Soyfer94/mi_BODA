import { Routes } from '@angular/router';
import { RsvpComponent } from './rsvp/rsvp.component';

export const routes: Routes = [
  { path: 'rsvp', component: RsvpComponent },
  { path: '**', redirectTo: 'rsvp' } // Ruta por defecto (opcional)
];