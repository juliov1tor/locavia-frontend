import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CadastroVeiculoComponent } from './views/cadastro-veiculo/cadastro-veiculo.component';
import { EditVeiculoComponent } from './views/edit-veiculo/edit-veiculo.component';
import { VehicleService } from './services/vehicle.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importações do angular material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CadastroVeiculoComponent,
    EditVeiculoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  // Ativa as animações do Angular
    MatTableModule,            // Tabela do Angular Material
    MatButtonModule,           // Botões do Angular Material
    MatIconModule              // Ícones do Angular Material
  ],
  providers: [VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
