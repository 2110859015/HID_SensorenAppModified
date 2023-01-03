import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { SensorsDataComponent } from './dashboard/sensors-data/sensors-data.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddSensorsComponent } from './dashboard/sensors/add-sensors/add-sensors.component';
import { SensorsComponent } from './dashboard/sensors/sensors.component';
import { MatTableModule } from '@angular/material/table';
import { SensorsDataOverTimeComponent } from './dashboard/sensors-data/sensors-data-over-time/sensors-data-over-time.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AddSensorsDataComponent } from './dashboard/sensors-data/add-sensors-data/add-sensors-data.component';
import { EditSensorsComponent } from './dashboard/sensors/edit-sensors/edit-sensors.component';
import { EditSensorsDataComponent } from './dashboard/sensors-data/edit-sensors-data/edit-sensors-data.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ButtonComponent,
    HeaderComponent,
    SensorsDataComponent,
    AboutPageComponent,
    AddSensorsComponent,
    SensorsComponent,
    SensorsDataOverTimeComponent,
    AddSensorsDataComponent,
    EditSensorsComponent,
    EditSensorsDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
