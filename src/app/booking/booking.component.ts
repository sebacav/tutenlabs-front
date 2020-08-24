import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings : Booking[] = [
    {lastName: "Carreño", bookingId: 1, bookingPrice: 500000, bookingTime: "2020-12-25", firstName: "Sebastian"},
    {lastName: "Villanueva", bookingId: 2, bookingPrice: 600000, bookingTime: "2020-06-25", firstName: "Alfredo"}
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
