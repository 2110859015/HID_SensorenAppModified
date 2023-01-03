import { Component, Injectable, OnInit } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sensors-data-over-time',
  templateUrl: './sensors-data-over-time.component.html',
  styleUrls: ['./sensors-data-over-time.component.scss']
})
export class SensorsDataOverTimeComponent implements OnInit {
  temperatures: number[] = [];
  dataLabels: string[] = [];
  public chart: any;

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.dataLabels,
        datasets: [
          {
            label: "Temperature",
            data: this.temperatures,
            backgroundColor: 'purple'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

  public updateChart() {
    this.backendService.getAllMeasurements();
    this.dataLabels = this.storeService.measurements.map(function (msrmt) {
      return msrmt["dateTime"].toString();
    });

    this.temperatures = this.storeService.measurements.map(function (msrmt) {
      return msrmt["temperature"];
    });
    this.chart.destroy();
    this.createChart();
    console.log('chart updated');
  }


  constructor(private backendService: BackendService, public storeService: StoreService) {
  }


  async ngOnInit() {
    this.storeService.isLoading = true;
    await this.backendService.getAllMeasurements();
    this.storeService.isLoading = false;

    this.dataLabels = this.storeService.measurements.map(function (msrmt) {
      return msrmt["dateTime"].toString();
    });

    this.temperatures = this.storeService.measurements.map(function (msrmt) {
      return msrmt["temperature"];
    });

    console.log('labels: ' + this.dataLabels);
    console.log('temps: ' + this.temperatures);
    this.createChart();

  }


}
