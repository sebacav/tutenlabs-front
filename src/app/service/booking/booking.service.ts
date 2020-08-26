import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  // URI base de la API
  uri = "https://dev.tuten.cl/TutenREST/rest";

  constructor(private http: HttpClient) { }

  // bookings es un método que retorna todos los bookings de la API
  bookings(): Observable<Object> {

    // Se generan los Headers necesarios
    let headers = new HttpHeaders({
      'app': 'APP_BCK',
      'Accept': 'application/json',
      'adminemail': 'testapis@tuten.cl',
      'token': sessionStorage.getItem('access_token')
    });

    // Se agrega un campo params de tipo get
    let params = new HttpParams().append('current','true');

    // Se hace una llamada al servicio de la API, agregando headers y params
    return this.http.get(this.uri + '/user/contacto@tuten.cl/bookings', { headers: headers, params: params })
        .pipe(
            map(result => {
                console.log(result)
                return result;
            },
            )
        );
  }

}
