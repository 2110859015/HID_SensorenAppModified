import { Measurement } from './../../../Measurement';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-sensors-data',
  templateUrl: './add-sensors-data.component.html',
  styleUrls: ['./add-sensors-data.component.scss']
})
export class AddSensorsDataComponent {
  @ViewChild('formDirective')
  private formDirective!: NgForm;
  measurementForm = new FormGroup({
    dateTime: new FormControl('', Validators.required),
    temperature: new FormControl('', Validators.required),
    humidity: new FormControl('', Validators.required),
    sensorId: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.formDirective.valid) {
      const sDateTime: string = String(this.measurementForm.value.dateTime);
      const sTemperature: string = String(this.measurementForm.value.temperature);
      const sHumidity: number = Number(this.measurementForm.value.humidity);
      const sSensorId: number = Number(this.measurementForm.value.sensorId)

      const sensor = this.storeService.sensors.filter(s => {
        return s.id === sSensorId;
      });

      const measurement: Measurement = {
        id: 1,
        dateTime: sDateTime,
        temperature: Number(sTemperature),
        humidity: Number(sHumidity),
        sensor: 'http://localhost:8080/sensors/' + String(sSensorId),
      };

      console.log('before backend: ' + measurement);

      this.backendService.createMeasurement(measurement);
      this.formDirective.resetForm();
    } else {
      console.log('msrmt form not valid...');
    }

  }

  constructor(public storeService: StoreService, public backendService: BackendService) { }

  ngOnInit(): void {
  }
}
