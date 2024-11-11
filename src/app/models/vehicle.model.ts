// Tipo para quando o veiculo está sendo criado (sem o id)
export interface VehicleForCreation {
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

// Tipo para o veículo com o id obrigatório (usado para exibir ou editar)
export interface Vehicle {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}
