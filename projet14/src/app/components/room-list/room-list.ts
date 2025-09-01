import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { BookingService } from '../../services/booking';
import {Room} from '../../models/room';
import { AvailabilityIndicator } from '../availability-indicator/availability-indicator';
import {CommonModule} from '@angular/common';
import {Tooltip} from '../../directives/tooltip';

@Component({
  selector: 'app-room-list',
  imports: [
    CommonModule,
    AvailabilityIndicator,
    Tooltip
  ],
  templateUrl: './room-list.html',
  styleUrl: './room-list.scss'
})
export class RoomList {
  @Input() selectedDate!: Date;
  @Output() roomSelected = new EventEmitter<Room>();

  bookingService = inject(BookingService);

  get rooms(): Room[]{
    return this.bookingService.rooms();
  }

  getRoomBookings(roomId: string): number{
    return this.bookingService.getBookingsForRoom(roomId, this.selectedDate).length;
  }

  onRoomSelect(room: Room): void{
    this.roomSelected.emit(room);
  }
}
