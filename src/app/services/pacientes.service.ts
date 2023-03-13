import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/pacientes';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  server = 'http://localhost:8080/api';
  constructor(private service: HttpClient) { }
  

  getPacientes(): Observable<any> {
    return this.service.get(`${this.server}/pacientes`);
  }

  getOnePaciente(idp: number): Observable<any> {
    return this.service.get(`${this.server}/pacientes/{idp}?idp=${idp}`);
  }

  addPacientes(paciente: Paciente) {
    return this.service.post<Paciente>(`${this.server}/pacientes/`, paciente);
  }

  updatePacientes(paciente: Paciente) {
    return this.service.put<Paciente>(`${this.server}/pacientes`, paciente);
  }

  deletePacientes(idp: number): Observable<any> {
    return this.service.delete(`${this.server}/pacientes/${idp}`);
  }
  
}
