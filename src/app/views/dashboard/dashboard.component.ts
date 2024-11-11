import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleService } from '../../services/vehicle.service';

// Interface para definir o tipo de dados do veículo
export interface Vehicle {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Colunas exibidas na tabela
  displayedColumns: string[] = ['id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'acoes'];
  dataSource = new MatTableDataSource<Vehicle>();

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  // Métdo para carregar veículos e atualizar o dataSource
  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe((data: Vehicle[]) => {
      this.dataSource.data = data;
    });
  }

  // Método para excluir um veículo
  deleteVehicle(id: number): void {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.vehicleService.deleteVehicle(id).subscribe(() => {
        this.loadVehicles();
      });
    }
  }
}
