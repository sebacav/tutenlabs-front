import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = "https://dev.tuten.cl/TutenREST/rest";

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {

    let headers = new HttpHeaders({
      'app': 'APP_BCK',
       'Accept': 'application/json',
       'password': password
      });
    return this.http.put<{ sessionTokenBck: string }>(this.uri + '/user/'+email, { }, {headers: headers })
        .pipe(
            map(result => {
                console.log(result)
                sessionStorage.setItem('access_token', result.sessionTokenBck);
                sessionStorage.setItem('email', email);
                return true;
            })
        );
  }

  isLogged?(): boolean{
    if(sessionStorage.getItem('access_token') != null){
      return true
    }
    return false
  }
}
