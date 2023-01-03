import { Sensor } from "./Sensor";

export interface Measurement {
  id: number;
  dateTime: Date | string;
  temperature: number;
  humidity: number;
  sensor: Sensor | string;
}
