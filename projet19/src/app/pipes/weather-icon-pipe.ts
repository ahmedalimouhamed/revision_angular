import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {

  transform(iconCode: string): string {
    const iconMap: {[key: string]: string} = {
      '01d': 'sun',
      '02d': 'cloud-sun',
      '03d': 'cloud',
      '04d': 'cloud',
      '09d': 'cloud-showers',
      '10d': 'cloud-showers',
      '11d': 'cloud-bolt',
      '13d': 'cloud-snow',
      '50d': 'cloud',
      '01n': 'moon',
      '02n': 'cloud-moon',
      '03n': 'cloud',
      '04n': 'cloud',
      '09n': 'cloud-showers',
      '10n': 'cloud-showers',
      '11n': 'cloud-bolt',
      '13n': 'cloud-snow',
      '50n': 'cloud'
    }
    return iconMap[iconCode] || 'cloud';
  }

}
