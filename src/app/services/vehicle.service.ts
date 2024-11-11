import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vehicle, VehicleForCreation } from 'src/app/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/vehicles';

  constructor(private http: HttpClient) {}

  createVehicle(vehicle: VehicleForCreation): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle).pipe(
      catchError(this.handleError)
    );
  }

  // metodo atualização de veículo
  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${vehicle.id}`, vehicle).pipe(
      catchError(this.handleError)
    );
  }

  // Metodo para obter todos os veiculos
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obter um veículo específico
  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Metodo para excluir um veículo
  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // função para tratar erros
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error("Erro do lado do cliente:", error.error.message);
    } else {
      console.error(`Erro do lado do servidor: Código ${error.status}, ` + `mensagem: ${error.message}`);
    }
    return throwError(error);
  }
}
