import { NgModule, isDevMode } from '@angular/core';
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
import { ProfileComponent } from './profile/profile.component';
import { EditChildModalComponent } from './edit-child-modal/edit-child-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Import this module


@NgModule({
  declarations: [
    AppComponent,
    AddChildModalComponent,
    AddActivityComponent,
    DashboardComponent,
    ProfileComponent,
    EditChildModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
