import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Measurement } from 'src/app/Measurement';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-edit-sensors-data',
  templateUrl: './edit-sensors-data.component.html',
  styleUrls: ['./edit-sensors-data.component.scss']
})
export class EditSensorsDataComponent {
  @Input() msrmtToEdit: number = 0;
  @Output() showEditPane = new EventEmitter<Boolean>();

  @ViewChild('formDirective')
  private formDirective!: NgForm;
  measurementForm = new FormGroup({
    dateTime: new FormControl('', Validators.required),
    temperature: new FormControl('', Validators.required),
    humidity: new FormControl('', Validators.required),
    sensorId: new FormControl('', Validators.required),
  });

  closeEditPane(){
    this.showEditPane.emit(false);
    console.log("closed edit pane");
  }

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
        id: this.msrmtToEdit,
        dateTime: sDateTime,
        temperature: Number(sTemperature),
        humidity: Number(sHumidity),
        sensor: 'http://localhost:8080/sensors/' + String(sSensorId),
      };

      // console.log('before backend: ' + JSON.stringify(measurement));

      this.backendService.editMeasurement(measurement);
      this.formDirective.resetForm();
      this.closeEditPane();
    } else {
      console.log('msrmt form not valid...');
    }

  }

  sensorActive: boolean[] = [];
  sensorType: string[] = [];

  constructor(public storeService: StoreService, public backendService: BackendService) { }

  ngOnInit(): void {
  }
}
