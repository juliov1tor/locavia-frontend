import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CadastroVeiculoComponent } from './views/cadastro-veiculo/cadastro-veiculo.component';
import { EditVeiculoComponent } from './views/edit-veiculo/edit-veiculo.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cadastro-veiculo', component: CadastroVeiculoComponent },
  { path: 'edit-veiculo/:id', component: EditVeiculoComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
