import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Se crea la variable de formulario, que contiene los datos
  // ambos campos deben existir
  loginForm: FormGroup = new FormGroup({
    'email': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.minLength(2))
  });

  constructor(
    private router: Router,
    private login: LoginService,
    private snackBar: MatSnackBar
     ) { }

  ngOnInit(): void {
  }

  // submit, es un método convocado desde la vista
  // este se gatilla al momento de intentar iniciar sesión
  public submit(user: User) {
    // Se llama al servicio de login
    this.login.login(user.email,user.password)
    .subscribe( result => {
      // Si la respuesta es success, entonces nos dirige a la vista de booking
      this.router.navigate(['booking']);
    }, error => {
      // Si sucede algún error, entonces mostrara un pequeño anuncio
      // De credenciales invalidas
      this.snackBar.open('CREDENCIALES INCORRECTAS', 'OK', {
        duration: 2500,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['red-snackbar']
      });
    })
  }

}
