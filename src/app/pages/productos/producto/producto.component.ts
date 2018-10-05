import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators, FormArray} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { ProductoService } from '@services/producto/producto.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  forma: FormGroup;

  constructor(private _activatedRoute: ActivatedRoute, private _productosService: ProductoService) {
    this.forma = new FormGroup({
      'Tipo': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'Nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'Precio': new FormControl('', [Validators.required]),
      'Descripcion': new FormControl('',[Validators.required]),
      'Tags': new FormControl('', Validators.required)
        });

      this._activatedRoute.params
                  .subscribe(
                    (params: any) => {
                      let nombre = params['name'];
                      console.log(nombre);
                      this._productosService.getProductoByName(nombre)
                            .subscribe(
                              (producto) =>{
                                console.log(producto);
                              }
                            );
                      this.forma.setValue({
                        Nombre: nombre,
                        Tipo: '',
                        Precio: '',
                        Descripcion: '',
                        Tags: ''
                      });
                    }
                  );
   }

   agregarInformacion(): void {
     
   }

  ngOnInit() {
  }

}
