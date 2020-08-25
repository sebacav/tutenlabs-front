import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private login: LoginService
     ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.minLength(2))
    });
  }

  public submit(user: User) {
    console.log(user.email, user.password)
    this.login.login(user.email,user.password)
    .subscribe( result => {
      this.router.navigate(['booking']);
    }, error => {
    })

    
  }

}
