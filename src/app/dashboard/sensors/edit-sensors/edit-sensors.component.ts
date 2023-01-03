import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { SensorPosition, Sensor } from 'src/app/Sensor';
import { BackendService } from 'src/app/shared/backend.service';
import { SENSOR_ACTIVE, SENSOR_TYPE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-edit-sensors',
  templateUrl: './edit-sensors.component.html',
  styleUrls: ['./edit-sensors.component.scss']
})
export class EditSensorsComponent {
  @Input() sensorToEdit: number = 0;
  @Output() showEditPane = new EventEmitter<Boolean>();
  sensorActive: boolean[] = [];
  sensorType: string[] = [];
  sensorPos = SensorPosition;

  @ViewChild('formDirective')
  private formDirective!: NgForm;
  sensorEditForm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });

  constructor(public storeService: StoreService, public backendService: BackendService) { }

  async ngOnInit() {
    this.sensorActive = SENSOR_ACTIVE;
    this.sensorType = SENSOR_TYPE;
  }

  closeEditPane(){
    this.showEditPane.emit(false);
    console.log("closed edit pane");
  }

  onSubmit() {
    if (this.formDirective.valid) {
    const sName: string = String(this.sensorEditForm.value.name);
    const sLocation: string = String(this.sensorEditForm.value.location);
    const sStatus: boolean = Boolean(this.sensorEditForm.value.status);
    const sSensorType: SensorPosition = (<any>SensorPosition)[String(this.sensorEditForm.value.type).toLocaleUpperCase()];

    const sensor: Sensor = {
      id: this.sensorToEdit,
      name: sName,
      location: sLocation,
      status: sStatus,
      sensorType: sSensorType
    };

    this.backendService.editSensor(sensor);
    this.formDirective.resetForm();
    this.closeEditPane();
    } else {
      console.log('form not valid...');
    }

  }
}
