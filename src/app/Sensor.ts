export interface Sensor {
  id: number;
  name: string;
  location: string;
  status: boolean;
  sensorType: SensorPosition;
}

export enum SensorPosition {
  INDOOR = 'INDOOR',
  OUTDOOR = 'OUTDOOR',
  WATER = 'WATER'
}
