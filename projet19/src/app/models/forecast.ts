export interface Forecast {
    date: Date;
    temperature: number; 
    minTemperature: number;
    maxTemperature: number;
    description: string;
    icon: string;
    precipitation: number;
    humidity: number;
}
