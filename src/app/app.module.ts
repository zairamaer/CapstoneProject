import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; // Import IonicModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddChildModalComponent } from './add-child-modal/add-child-modal.component'; 
import { AddActivityComponent } from './add-activity/add-activity.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    AddChildModalComponent, 
    AddActivityComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule, 
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
