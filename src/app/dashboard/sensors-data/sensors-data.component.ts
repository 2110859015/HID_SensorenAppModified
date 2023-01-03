import { Component, OnInit } from '@angular/core';
import { SensorPosition } from 'src/app/Sensor';
import { BackendService } from 'src/app/shared/backend.service';
import { SENSORS_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.scss']
})
export class SensorsDataComponent implements OnInit {
  displayedColumns: string[] = ['sensor', 'dateTime', 'temperature', 'humidity', 'edit', 'delete'];
  public pages: number = 0;
  public currentPage: number = 1;

  showEditDialogue: Boolean = false;
  msrmtToEdit: number = 0;

  toggleEditPane(msrmtId: number) {
    this.msrmtToEdit = msrmtId;
    this.showEditDialogue=!this.showEditDialogue;
    console.log('toggled dialogue to: ' + this.showEditDialogue);
  }

  closeEditDialogue() {
    this.showEditDialogue = false;
  }

  public get SensorPosition() { return SensorPosition; }

  constructor(private backendService: BackendService, public storeService: StoreService) { }

  deleteMeasurement(msrmtId: number) {
    this.backendService.deleteMeasurement(msrmtId);
  }

  async ngOnInit() {
    this.storeService.isLoading = true;
    await this.backendService.getAllMeasurements();
    this.storeService.isLoading = false;
    this.pages = Math.ceil(this.storeService.sensorenDatenTotalCount / SENSORS_PER_PAGE);
  }

}
