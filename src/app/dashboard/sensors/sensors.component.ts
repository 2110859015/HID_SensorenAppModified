import { Component, OnInit } from '@angular/core';
import { SensorPosition } from 'src/app/Sensor';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
  showEditDialogue: Boolean = false;
  sensorToEdit: number = 0;

  toggleEditPane(sensorId: number) {
    this.sensorToEdit = sensorId;
    this.showEditDialogue=!this.showEditDialogue;
    console.log('toggled dialogue to: ' + this.showEditDialogue);
  }

  closeEditDialogue() {
    this.showEditDialogue = false;
  }

  deleteSensor(sensorId: number) {
    // console.log('delete sensor with id: ' + sensorId);
    this.backendService.deleteSensor(sensorId);
  }

  displayedColumns: string[] = ['id', 'name', 'location', 'status', 'sensorType', 'edit', 'delete'];

  //displayedColumns: string[] = ['id', 'name', 'location', 'status', 'sensorType', 'edit'];

  public get SensorPosition() { return SensorPosition; }

  constructor(private backendService: BackendService, public storeService: StoreService) { }

  async ngOnInit() {
    this.storeService.isLoading = true;
    await this.backendService.getAllSensors();
    await this.backendService.getAllMeasurementsWithSensor();
    this.storeService.isLoading = false
  }
}

