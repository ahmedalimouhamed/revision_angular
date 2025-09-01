import { Component, inject, signal } from '@angular/core';
import { BookingService } from '../../services/booking';
import { RoomList } from '../room-list/room-list';
import { BookingForm } from '../booking-form/booking-form';
import { BookingCalendar } from '../booking-calendar/booking-calendar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Room } from '../../models/room';

@Component({
  selector: 'app-booking-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RoomList,
    BookingForm,
    BookingCalendar
  ],
  templateUrl: './booking-dashboard.html',
  styleUrl: './booking-dashboard.scss'
})
export class BookingDashboard {
  bookingService = inject(BookingService);
  
  selectedDate = signal<Date>(new Date());
  selectedRoom = signal<Room | null>(null);
  showBookingForm = signal<boolean>(false);

  onRoomSelected(room: Room) {
    this.selectedRoom.set(room);
    this.showBookingForm.set(true);
  }

  onBookingCreated() {
    this.showBookingForm.set(false);
    // Refresh any necessary data here
  }

  onDateChange(date: Date | null) {
    if (date) {
      this.selectedDate.set(new Date(date));
    }
  }

  onDateSelected(date: Date) {
    this.selectedDate.set(new Date(date));
    if (!this.showBookingForm()) {
      this.showBookingForm.set(true);
    }
  }
}
