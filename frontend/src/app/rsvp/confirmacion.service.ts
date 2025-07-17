import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Confirmacion } from './confirmacion.model'; // Importa la interfaz

@Injectable({ providedIn: 'root' })
export class ConfirmacionService {
  private apiUrl = 'http://localhost:3000/api/confirmacion';

  constructor(private http: HttpClient) {}


  confirmar(data: any) {
  return this.http.post(this.apiUrl, data);
}
}
