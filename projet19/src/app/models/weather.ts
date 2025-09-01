export interface Weather {
    location: string;
    country: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    description: string;
    icon: string;
    sunrise: Date;
    sunset: Date;
    visibility: number;
    uvIndex: number;
}

