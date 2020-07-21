import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarteleraComponent } from './home/cartelera/cartelera.component';
import { AdminComponent } from './admin/admin.component';
import { MovieCardComponent } from './home/movie-card/movie-card.component';
import { TheatreSelectorComponent } from './home/theatre-selector/theatre-selector.component';
import { DateSelectorComponent } from './home/date-selector/date-selector.component';
import { BuyWindowComponent } from './home/buy-window/buy-window.component';
import { SelectSeatsComponent } from './home/select-seats/select-seats.component';
import { SeatPickerComponent } from './home/seat-picker/seat-picker.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { BarraPrincipalComponent } from './barra-principal/barra-principal.component';
import { EmpleadoLoginComponent } from './empleado-login/empleado-login.component';
import { FormsModule } from '@angular/forms';
import { TheaterAdminLoginComponent } from './theater-admin-login/theater-admin-login.component';
import { ProductionFormComponent } from './admin/production-form/production-form.component';
import { EmployeeFormComponent } from './admin/employee-form/employee-form.component';
import { ProductionOptionsComponent } from './admin/production-options/production-options.component';
import { PresentationFormComponent } from './admin/presentation-form/presentation-form.component';
import { PriceFormComponent } from './admin/price-form/price-form.component';
import { StateFormComponent } from './admin/state-form/state-form.component';
import { SysAdimLoginComponent } from './admin/sys-adim-login/sys-adim-login.component';
import { SysAdminComponent } from './admin/sys-admin/sys-admin.component';
import { TeatroEmployeeFormComponent } from './admin/teatro-employee-form/teatro-employee-form.component';
import { TeatroFormComponent } from './admin/teatro-form/teatro-form.component';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarteleraComponent,
    AdminComponent,
    MovieCardComponent,
    TheatreSelectorComponent,
    DateSelectorComponent,
    BuyWindowComponent,
    SelectSeatsComponent,
    SeatPickerComponent,
    CheckoutComponent,
    BarraPrincipalComponent,
    EmpleadoLoginComponent,
    TheaterAdminLoginComponent,
    ProductionFormComponent,
    EmployeeFormComponent,
    ProductionOptionsComponent,
    PresentationFormComponent,
    PriceFormComponent,
    StateFormComponent,
    SysAdimLoginComponent,
    SysAdminComponent,
    TeatroEmployeeFormComponent,
    TeatroFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [EncrDecrServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
