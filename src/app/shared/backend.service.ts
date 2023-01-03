import { SensorsDataOverTimeComponent } from './../dashboard/sensors-data/sensors-data-over-time/sensors-data-over-time.component';
import { Sensor } from './../Sensor';
import { Measurement } from '../Measurement';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, map } from 'rxjs';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  sensors: Sensor[] = [];
  sensorData: Measurement[] = [];
  sensorDataWithSensor: Measurement[] = []

  constructor(private storeService: StoreService, private http: HttpClient) { }

  /*
    SENSOR CRUD FUNCTIONALITY
  */

  public async createSensor(sensor: Sensor) {
    console.log('adding: ' + JSON.stringify(sensor));
    // "name": "sensor1","location": "Vienna","status":"true","sensorType":"OUTDOOR"
    await firstValueFrom(this.http.post<any>('http://localhost:8080/sensors', sensor));
    await this.getAllSensors();
  }

  public async deleteSensor(sensorId: number) {
    await firstValueFrom(this.http.delete<any>(`http://localhost:8080/sensors/${sensorId}`));
    console.log('deleted sensor with id: ' + sensorId);
    await this.getAllSensors();
    // http://localhost:8080/sensors/15
  }

  public async editSensor(sensor: Sensor) {
    console.log('editing: ' + JSON.stringify(sensor));
    // "name": "sensor1","location": "Vienna","status":"true","sensorType":"OUTDOOR"
    await firstValueFrom(this.http.put<any>(`http://localhost:8080/sensors/${sensor.id}`, sensor));
    await this.getAllSensors();
    await this.getAllMeasurementsWithSensor();
  }

  /*
    MEASUREMENT CRUD FUNCTIONALITY
  */

  public async createMeasurement(measurement: Measurement) {
    console.log('adding: ' + JSON.stringify(measurement));
    await firstValueFrom(this.http.post<any>('http://localhost:8080/measurements?projection=measurement-ng', measurement));
    await this.getAllMeasurementsWithSensor();
  }


  public async deleteMeasurement(measurementId: number) {
    await firstValueFrom(this.http.delete<any>(`http://localhost:8080/measurements/${measurementId}`));
    console.log('deleted measurement with id: ' + measurementId);
    await this.getAllMeasurementsWithSensor();
    // http://localhost:8080/measurements/15
  }



  public async editMeasurement(measurement: Measurement) {
    console.log('editing: ' + JSON.stringify(measurement));
    await firstValueFrom(this.http.put<any>(`http://localhost:8080/measurements/${measurement.id}`, measurement));
    await this.getAllMeasurementsWithSensor();
  }

  public async getAllSensors() {
    this.sensors = await firstValueFrom(this.http.get<any>('http://localhost:8080/sensors')
      .pipe(
        map(response => response._embedded.sensor)
      ));
    this.storeService.sensors = this.sensors.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    console.log(this.sensors);
  }

  public async getAllMeasurements() {
    this.sensorData = await firstValueFrom(this.http.get<any>(`http://localhost:8080/measurements?projection=measurement-ng`)
      .pipe(
        map(response => response._embedded.measurement)
      ));

    this.storeService.measurements = this.sensorData.sort((a, b) => {
      return new Date(a.dateTime).valueOf() - new Date(b.dateTime).valueOf();
    });;
    // console.log(this.sensorData);
  }

  public async getAllMeasurementsWithSensor() {
    const sensorsDataWithSensorResponse = await firstValueFrom(
      this.http.get<any>('http://localhost:8080/measurements?projection=measurement-ng', { observe: 'response' }));

    const sensorDataWithSensor: Measurement[] = sensorsDataWithSensorResponse.body._embedded.measurement;

    this.storeService.measurements = sensorDataWithSensor.sort((a, b) => {
      return new Date(a.dateTime).valueOf() - new Date(b.dateTime).valueOf();
    });
    console.log(this.storeService.measurements);

  }

  /*

  public async getSensorsData(page: number) {
    const sensorenDataResponse = await firstValueFrom(this.http.get<any>(`http://localhost:5000/sensorsData?_page=${page}&_limit=${SENSORS_PER_PAGE}`, { observe: 'response' }));
    this.storeService.sensorenDatenTotalCount = Number(sensorenDataResponse.headers.get('X-Total-Count'));

    const sensorenData: Sensordata[] = sensorenDataResponse.body.map((data: any) => {
      const sensor: Sensor = this.sensors.filter(sensor => sensor.id == data.sensorId)[0];
      return { ...data, sensor }
    });
    this.storeService.sensorsData = sensorenData;
  }
  */
}
