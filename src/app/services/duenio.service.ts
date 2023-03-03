import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuenioService {
  server = 'http://localhost:8080/api';
  constructor(private service: HttpClient) { }

  getDuenio(): Observable<any> {
    return this.service.get('http://localhost:8080/api/duenio');
  }
}
