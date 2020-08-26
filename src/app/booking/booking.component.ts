import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking'
import { BookingService } from '../service/booking/booking.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  // Se crea un objeto de tipo formulario, donde almacenaremos las variables del form de filtrado
  // Se ha agregado validaciones numericas y de que son campos obligatorios
  formFilter = new FormGroup({
    cantidad: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    operador: new FormControl('', Validators.required),
    tipoDato: new FormControl('', Validators.required),
  })

  // Se crea una variable que contendrá los bookings entregados por el servicio
  bookings : Booking[] = [
    // {lastName: "Carreño", bookingId: 1, bookingPrice: 500000, bookingTime: "2020-12-25", firstName: "Sebastian"},
    // {lastName: "Villanueva", bookingId: 2, bookingPrice: 600000, bookingTime: "2020-06-25", firstName: "Alfredo"}
  ]

  // Se crea una variable de bookings, que contendrá los bookings filtrados
  // Esta variable es la que se utiliza en la vista
  bookingsTable : Booking[]

  // Se crea un arreglo de objetos de todos los tipos de datos a filtrar
  tiposDatos = [
    {id: 1, valor: "ID", originName: "bookingId"},
    {id: 2, valor: "Price", originName: "bookingPrice"},
  ]

  // Se crea un arreglo de objetos de los tipos de operadores permitidos
  operadores = [
    {id: 1, valor: ">="},
    {id: 2, valor: "="},
    {id: 3, valor: "<="}
  ]

  constructor(
    private booking: BookingService,
    private login: LoginService
    ) {
  }

  // Al iniciar la vista, se cargan los bookings, mediante un servicio
  ngOnInit(): void {
    this.cargarBooking()
  }

  // cargarBooking, se suscribe al servicio que hace la consulta a la API TutenLabs
  // luego agrega al modelo Bookings, los valores que utilizaremos en esta aplicacion
  public cargarBooking(){
    this.booking.bookings().subscribe( result => {
      // Se recorren los objetos que devuelva la API
      for (let i in result) {
        // Se agregan al arreglo bookings, las variables correspondientes
        this.bookings.push({
          lastName: result[i].tutenUserClient.lastName,
          bookingId: result[i].bookingId,
          bookingPrice: result[i].bookingPrice,
          bookingTime: result[i].bookingTime,
          firstName: result[i].tutenUserClient.firstName
        })
      }
      // Se copian los datos al arreglo de bookings que contendrá los filtros
      // y sera quien realmente se visualice
      this.bookingsTable = this.bookings
    }, error => {
      this.login.logout()
    })
  }

  // filtro, es un metodo que es llamado desde la vista y recibe el formulario
  // dependiendo del operador generará el filtro correspondiente
  public filtro(form: any){
    switch (form.operador) {
      case "=":
        this.bookingsTable = this.bookings.filter(item => item[form.tipoDato] == form.cantidad)
        break;
      case ">=":
        this.bookingsTable = this.bookings.filter(item => item[form.tipoDato] >= form.cantidad)
        break;
      case "<=":
        this.bookingsTable = this.bookings.filter(item => item[form.tipoDato] <= form.cantidad)
        break;
    }
  }


}
