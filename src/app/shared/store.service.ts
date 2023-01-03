import { Injectable } from '@angular/core';
import { Sensor } from '../Sensor';
import { Measurement } from '../Measurement';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public measurements: Measurement[] = [];
  public sensorenDatenTotalCount: number = 0;
  public sensors: Sensor[] = [];
  public isLoading = true;
}
