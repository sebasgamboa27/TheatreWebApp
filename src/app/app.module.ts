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
    SeatPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
