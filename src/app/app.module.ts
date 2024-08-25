import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; // Import IonicModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import the AddChildModalComponent and any other components here
import { AddChildModalComponent } from './add-child-modal/add-child-modal.component'; 

@NgModule({
  declarations: [
    AppComponent,
    AddChildModalComponent // Declare the AddChildModalComponent here
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule, // Ensure FormsModule is imported here
    IonicModule.forRoot(), // Initialize IonicModule
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
