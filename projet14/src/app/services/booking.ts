import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, of, delay} from 'rxjs'
import {Room} from '../models/room';
import { signal } from '@angular/core';
import { BookingRequest } from '../models/booking';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly ROOMS_KEY = "meeting_rooms";
  private readonly BOOKINGS_KEY = "room_bookings";

  rooms = signal<Room[]>(this.loadRooms());
  bookings = signal<Booking[]>(this.loadBookings());

  private selectedDateSubject = new BehaviorSubject<Date>(new Date());
  selectedDate$ = this.selectedDateSubject.asObservable();

  private loadRooms(): Room[]{
    const data = localStorage.getItem(this.ROOMS_KEY);
    return data ? JSON.parse(data) : this.generateSampleRooms();
  }

  private loadBookings(): Booking[]{
    const data = localStorage.getItem(this.BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  }

  private generateSampleRooms(): Room[]{
    return [
      {
        id: '1',
        name: 'Salle Conférence A',
        capacity: 20,
        equipement: ['Projecteur', 'Table', 'Chaise'],
        location: 'Bâtiment A',
        floor: 1,
        hourlyRate: 100,
        available: true
      },
      {
        id: '2',
        name: 'Salle Réunion B',
        capacity: 15,
        equipement: ['Projecteur', 'Table', 'Chaise'],
        location: 'Bâtiment B',
        floor: 2,
        hourlyRate: 150,
        available: true
      },
      {
        id: '3',
        name: 'Salle Conférence B',
        capacity: 25,
        equipement: ['Projecteur', 'Table', 'Chaise'],
        location: 'Bâtiment B',
        floor: 3,
        hourlyRate: 200,
        available: true
      }
    ]
  }

  createBooking(bookingRequest: BookingRequest): Observable<Booking>{
    return of(bookingRequest).pipe(
      delay(500),
      map((request: BookingRequest) => {
        const newBooking: Booking = {
          ...request,
          id: crypto.randomUUID(),
          status: 'confirmed',
          createdAt: new Date()
        };

        const updatedBookings = [...this.bookings(), newBooking];
        localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(updatedBookings));
        this.bookings.set(updatedBookings);

        return newBooking;
      })
    )
  }

  getBookingsForRoom(roomId: string, date: Date): Booking[]{
    return this.bookings().filter((booking: Booking) => 
      booking.roomId === roomId &&
      this.isSameDay(new Date(booking.startTime), date)
    )
  }

  isRoomAvailable(roomId: string, startTime: Date, endTime: Date): boolean{
    const conflictingBookings = this.bookings().filter((booking: Booking) => 
      booking.roomId === roomId &&
    booking.status === 'confirmed' &&
    this.isTimeOverlap(booking.startTime, booking.endTime, startTime, endTime)
    )
    return conflictingBookings.length === 0;
  }

  setSelectedDate(date: Date): void{
    this.selectedDateSubject.next(date)
  }

  private isSameDay(date1: Date, date2: Date): boolean{
    return date1.toDateString() === date2.toDateString();
  }

  private isTimeOverlap(start1: Date, end1: Date, start2: Date, end2: Date): boolean{
    return new Date(start1) < new Date(end2) && new Date(end1) > new Date(start2)
  }

}
