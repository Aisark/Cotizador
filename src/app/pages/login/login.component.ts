import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Usuario} from '../../interfaces/Usuario';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registrarse: boolean;

  usuario: Usuario = {
    email: 'example@example.com',
    password:''
  };

  constructor(private _router: Router) {
    this.registrarse = false;
   }

  ngOnInit() {
  }

  public toogleRegistro(): void{
    this.registrarse = !this.registrarse;
  }

  public iniciar(login: NgForm): void {
    console.log(login.value);
    this._router.navigate(['/cotizaciones']);
  }

  public registrar(registro: NgForm): void {
    this._router.navigate(['/cotizaciones']);
  }

}