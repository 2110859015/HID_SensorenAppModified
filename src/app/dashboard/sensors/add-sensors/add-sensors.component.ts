import { SENSOR_ACTIVE, SENSOR_TYPE } from '../../../shared/constants';
import { Sensor, SensorPosition } from '../../../Sensor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-sensors',
  templateUrl: './add-sensors.component.html',
  styleUrls: ['./add-sensors.component.scss']
})
export class AddSensorsComponent implements OnInit {
  sensorActive: boolean[] = [];
  sensorType: string[] = [];
  sensorPos = SensorPosition;

  @ViewChild('formDirective')
  private formDirective!: NgForm;
  sensorForm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.formDirective.valid) {
      const sName: string = String(this.sensorForm.value.name);
      const sLocation: string = String(this.sensorForm.value.location);
      const sStatus: boolean = Boolean(this.sensorForm.value.status);
      const sSensorType: SensorPosition = (<any>SensorPosition)[String(this.sensorForm.value.type).toLocaleUpperCase()];

      const sensor: Sensor = {
        id: 1,
        name: sName,
        location: sLocation,
        status: sStatus,
        sensorType: sSensorType
      };

      this.backendService.createSensor(sensor);
      this.formDirective.resetForm();
    } else {
      console.log('form not valid...');
    }

  }

  constructor(public storeService: StoreService, public backendService: BackendService) { }

  ngOnInit(): void {
    this.sensorActive = SENSOR_ACTIVE;
    this.sensorType = SENSOR_TYPE;
  }

}
