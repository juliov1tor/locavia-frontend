// src/app/components/cadastro-veiculo/cadastro-veiculo.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleForCreation } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-cadastro-veiculo',
  templateUrl: './cadastro-veiculo.component.html',
  styleUrls: ['./cadastro-veiculo.component.scss']
})
export class CadastroVeiculoComponent {
  newVehicle: VehicleForCreation = {
    placa: '',
    chassi: '',
    renavam: '',
    modelo: '',
    marca: '',
    ano: 0
  };
  errorMessage: string | null = null;

  constructor(private vehicleService: VehicleService, private router: Router) {}

  // Função para criar o carro
  createVehicle() {
    this.errorMessage = null;

    this.vehicleService.createVehicle(this.newVehicle).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error("Erro ao criar veículo:", error);
        this.handleError(error);
      }
    });
  }

  // Método para lidar com erros de validação
  private handleError(error: any) {
    if (error.status === 400) {
      const errorField = error.error.error.toLowerCase();
      if (errorField.includes('placa')) {
        this.errorMessage = 'Erro: Placa inválida ou já existente.';
      } else if (errorField.includes('chassi')) {
        this.errorMessage = 'Erro: Chassi inválido ou já existente.';
      } else if (errorField.includes('renavam')) {
        this.errorMessage = 'Erro: Renavam inválido ou já existente.';
      } else {
        this.errorMessage = 'Erro de validação. Verifique os campos e tente novamente.';
      }
    } else {
      this.errorMessage = 'Erro desconhecido. Tente novamente mais tarde.';
    }
  }

  // Método para navegar de volta para o dashboard
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
