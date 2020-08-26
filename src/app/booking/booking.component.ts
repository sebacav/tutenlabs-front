import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking'
import { Router } from '@angular/router';
import { BookingService } from '../service/booking/booking.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  formFilter = new FormGroup({
    cantidad: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    operador: new FormControl('', Validators.required),
    variable: new FormControl('', Validators.required),
  })
  bookings : Booking[] = [
    // {lastName: "Carreño", bookingId: 1, bookingPrice: 500000, bookingTime: "2020-12-25", firstName: "Sebastian"},
    // {lastName: "Villanueva", bookingId: 2, bookingPrice: 600000, bookingTime: "2020-06-25", firstName: "Alfredo"}
  ]

  bookingsTable : Booking[]

  variables = [
    {id: 1, valor: "ID", originName: "bookingId"},
    {id: 2, valor: "Price", originName: "bookingPrice"},
  ]

  operadores = [
    {id: 1, valor: ">="},
    {id: 2, valor: "="},
    {id: 3, valor: "<="}
  ]

  constructor(
    private booking: BookingService) {
  }

  ngOnInit(): void {
    this.cargarBooking()
  }

  public cargarBooking(){
    this.booking.bookings().subscribe( result => {
      for (let i in result) {
        this.bookings.push({
          lastName: result[i].tutenUserClient.lastName,
          bookingId: result[i].bookingId,
          bookingPrice: result[i].bookingPrice,
          bookingTime: result[i].bookingTime,
          firstName: result[i].tutenUserClient.firstName
        })
      }
      this.bookingsTable = this.bookings
      // this.router.navigate(['booking']);
    }, error => {
    })
  }
  public filtro(form: any){
    this.filtrar(form)
  }

  private filtrar(form: any){
    switch (form.operador) {
      case "=":
        this.bookingsTable = this.bookings.filter(item => item[form.variable] == form.cantidad)
        break;
      case ">=":
        this.bookingsTable = this.bookings.filter(item => item[form.variable] >= form.cantidad)
        break;
      case "<=":
        this.bookingsTable = this.bookings.filter(item => item[form.variable] <= form.cantidad)
        break;
    }
  }


}
