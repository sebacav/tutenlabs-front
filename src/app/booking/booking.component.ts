import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking'
import { Router } from '@angular/router';
import { BookingService } from '../service/booking/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings : Booking[] = [
    // {lastName: "Carreño", bookingId: 1, bookingPrice: 500000, bookingTime: "2020-12-25", firstName: "Sebastian"},
    // {lastName: "Villanueva", bookingId: 2, bookingPrice: 600000, bookingTime: "2020-06-25", firstName: "Alfredo"}
  ]

  campoDeFiltro = [
    {id: 1, valor: "bookingId"},
    {id: 1, valor: "bookingPrice"}
  ]

  tipoDeFiltro = [
    {id: 1, valor: ">="},
    {id: 2, valor: "="},
    {id: 3, valor: "<="}
  ]

  constructor(
    private router: Router,
    private booking: BookingService) {
  }

  ngOnInit(): void {
    this.cargarBooking()
  }

  public cargarBooking(){
    this.booking.bookings().subscribe( result => {
      console.log(result)
      for (let i in result) {
        this.bookings.push({
          lastName: result[i].tutenUserClient.lastName,
          bookingId: result[i].bookingId,
          bookingPrice: result[i].bookingPrice,
          bookingTime: result[i].bookingTime,
          firstName: result[i].tutenUserClient.firstName
        })
      }
      // this.router.navigate(['booking']);
    }, error => {
    })
  }

}
