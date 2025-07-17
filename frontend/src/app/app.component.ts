import { Component } from '@angular/core';
//import { RsvpComponent } from './rsvp/rsvp.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // <-- Importá HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, RouterOutlet,    HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // Usá `.css` si no estás usando SASS
})




export class AppComponent {
  title = 'Tarjeta de boda';
}