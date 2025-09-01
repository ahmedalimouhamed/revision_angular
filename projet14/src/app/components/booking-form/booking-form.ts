import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {BookingService} from '../../services/booking';
import {Room} from '../../models/room';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.scss'
})
export class BookingForm {
  @Input() room!: Room;
  @Input() selectedDate!: Date;
  @Output() bookingCreated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  bookingService = inject(BookingService);
  bookingError = '';

  bookingForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    startTime: new FormControl('09:00', Validators.required),
    endTime: new FormControl('10:00', Validators.required),
    organizer: new FormControl('', Validators.required),
    participants: new FormControl(''),
  })

  onSubmit(): void{
    if(this.bookingForm.valid){
      const formValue = this.bookingForm.value;
      const startDateTime = this.combineDateAndTime(this.selectedDate, formValue.startTime!);
      const endDateTime = this.combineDateAndTime(this.selectedDate, formValue.endTime!);

      if(this.bookingService.isRoomAvailable(this.room.id, startDateTime, endDateTime)){
        this.bookingService.createBooking({
          roomId: this.room.id,
          title: formValue.title!,
          description: formValue.description || '',
          startTime: startDateTime,
          endTime: endDateTime,
          organizer: formValue.organizer!,
          participants: formValue.participants?.split(',') || [],
        })
        .subscribe({
          next: () => {
            this.bookingCreated.emit();
            this.bookingForm.reset();
          },
          error: (error: Error | unknown) => {
            this.bookingError = 'Erreur lors de la réservation';
          }
        })
      }else{
        this.bookingError = 'La salle n\'est pas disponible';
      }
    }
  }

  private combineDateAndTime(date: Date, time: string):Date{
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);
    return newDate;
  }
}
