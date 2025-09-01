import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingFilter'
})
export class BookingFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
