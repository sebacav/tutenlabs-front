import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  uri = "https://dev.tuten.cl/TutenREST/rest";

  constructor(private http: HttpClient) { }

  bookings(): Observable<Object> {

    let headers = new HttpHeaders({
      'app': 'APP_BCK',
      'Accept': 'application/json',
      'adminemail': 'testapis@tuten.cl',
      'token': sessionStorage.getItem('access_token')
    });

    let params = new HttpParams().append('current','true');

    // return this.http.get(this.uri + '/user/'+sessionStorage.getItem('email')+'/bookings', { headers: headers, params: params })
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
