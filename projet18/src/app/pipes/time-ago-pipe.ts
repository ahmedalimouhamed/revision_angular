import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date): string {
    if(!value) return '';

    const now = new Date();
    const seconds = Math.floor((now.getTime() - value.getTime()) / 1000);

    if(seconds < 60){
      return 'à l\'instant';
    }

    const minutes = Math.floor(seconds / 60);
    if(minutes < 60){
      return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    const hours = Math.floor(minutes / 60);

    if(hours < 24){
      return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    }

    const days = Math.floor(hours / 24);

    if(days < 30){
      return `il y a ${days} jout${days > 1 ? 's' : ''}`;
    }

    const months = Math.floor(days / 30);

    if(months < 12){
      return `il y a ${months} mois${months > 1 ? 's' : ''}`;
    }

    const years = Math.floor(months / 12);
    return `il y a ${years} an${years > 1 ? 's' : ''}`;
  }

}
