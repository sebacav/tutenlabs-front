import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Almacenamos la raíz de la API
  uri = "https://dev.tuten.cl/TutenREST/rest";

  constructor(private http: HttpClient, private router: Router) { }

  // login, es un metodo que nos permite hacer un login a la API de TutenLabs
  login(email: string, password: string): Observable<boolean> {
    // Se agregan los headers requeridos
    let headers = new HttpHeaders({
      'app': 'APP_BCK',
       'Accept': 'application/json',
       'password': password
      });
    // Se retorna la respuesta de la consulta a la API
    return this.http.put<{ sessionTokenBck: string }>(this.uri + '/user/'+email, { }, {headers: headers })
        .pipe(
            map(result => {
              // Se agrega el token a la sessionStorage al igual que el email
              // estos seran necesarios, para el uso de otras consultas
                sessionStorage.setItem('access_token', result.sessionTokenBck);
                sessionStorage.setItem('email', email);
                return true;
            })
        );
  }

  // isLoggedIn, es un método que retorna true/false dependiendo
  // si el usuario tiene o no un token
  isLoggedIn(): boolean{
    if(sessionStorage.getItem('access_token') != null){
      return true
    }
    return false
  }

  // logout, es un método que nos permite cerrar sesión
  logout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate([""]);
}

}
