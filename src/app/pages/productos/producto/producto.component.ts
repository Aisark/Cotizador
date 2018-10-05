import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators, FormArray} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  forma: FormGroup;

  constructor(private _activatedRoute: ActivatedRoute) {
    this.forma = new FormGroup({
      'Tipo': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'Nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'Precio': new FormControl('', [Validators.required]),
      'Descripcion': new FormControl('',[Validators.required]),
      'tags': new FormControl('', Validators.required)
        });

      this._activatedRoute.params
                  .subscribe(
                    (params: any) => {
                      if (params['id']) {
                        
                      }
                    }
                  );
   }

   agregarInformacion(): void {
     
   }

  ngOnInit() {
  }

}
