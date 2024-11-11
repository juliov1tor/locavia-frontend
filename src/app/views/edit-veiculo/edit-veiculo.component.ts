import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-edit-veiculo',
  templateUrl: './edit-veiculo.component.html',
  styleUrls: ['./edit-veiculo.component.scss']
})
export class EditVeiculoComponent implements OnInit {
  vehicle: Vehicle = { id: 0, placa: '', chassi: '', renavam: '', modelo: '', marca: '', ano: 0 };
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Pega o ID do veiculo da URl
    const id = +this.route.snapshot.paramMap.get('id')!;

    // Verificar se o id é válido
    if (id && id > 0) {
      this.vehicleService.getVehicleById(id).subscribe({
        next: (data) => {
          this.vehicle = data;
        },
        error: (err) => {
          console.error('Erro ao carregar veículo:', err);
          // Verificar se o erro é 404 para exibir a mensagem correta
          if (err.status === 404) {
            this.errorMessage = 'Veículo não encontrado.';
          } else {
            this.errorMessage = 'Erro ao carregar os dados do veículo. Tente novamente.';
          }
        }
      });
    } else {
      this.errorMessage = 'ID inválido.';
    }
  }

  updateVehicle(): void {
    this.errorMessage = null;

    // Atualiza os dados do veículo na API
    this.vehicleService.updateVehicle(this.vehicle).subscribe({
      next: () => {
        // Após a atualizaç~ao redireciona de volta para o dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error("Erro ao atualizar veículo:", error);
        this.handleError(error);
      }
    });
  }

  // Metodo para tratar erros de validação
  private handleError(error: any): void {
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

  // Método para navegar de volta ao dashboard
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
