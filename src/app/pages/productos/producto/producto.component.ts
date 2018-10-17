import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators, FormArray} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
// Services
import { ProductoService } from '@services/producto/producto.service';

// Models
import { Tipo, Producto } from '@models/models.index';

import swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  forma: FormGroup;

  producto: any;
  
  loading = false;
  nuevo = false;
  mensajeBoton: string;
  tipos: Tipo [];

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _productosService: ProductoService,
    private _router: Router,
    private _location: Location
    ) {

    
    
    this._productosService.getTipoProductos().then(
      (tipos) => {
        this.tipos = tipos;
      }
    );

    this._activatedRoute.params
      .subscribe( (params) => {
        let name = params['name'];

        let tipo = params['tipo'];
        
        this.nuevo = tipo === 'nuevo' ? true : false ;
        
        this.mensajeBoton = (this.nuevo) ? 'Guardar' : 'Actualizar';

        if (this.nuevo) {

          this.initForm();

        } else {
          this._productosService.getProductoByName(name, tipo)
          .subscribe(
            (producto: any) => {
              this.producto = producto;
              this.initForm();
              this.forma.setValue({
                Nombre: producto.name,
                Tipo: producto.tipo,
                Peso: producto.peso,
                Precio: producto.precio.publico,
                PrecioDistribuidor: producto.precio.distribuidor_ocasional ,
                PrecioPreferencial: producto.precio.distribuidor_ocasional,
                Descripcion: producto.descripcion,
                Tags: producto.tag
              });
            }
          );
          
        }
        
      });
  }
  
  

   public initForm () {
    this.forma = new FormGroup({
      'Tipo': new FormControl({disabled: true}, [Validators.required, Validators.minLength(3)]),
      'Nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'Peso': new FormControl('', [Validators.required]),
      'Precio': new FormControl('', [Validators.required]),
      'PrecioDistribuidor': new FormControl('', [Validators.required]),
      'PrecioPreferencial': new FormControl('', [Validators.required]),
      'Descripcion': new FormControl('', [Validators.required]),
      'Tags': new FormControl('', Validators.required)
        });
        this.producto = {};
        if (!this.nuevo) {
          this.forma.controls['Tipo'].disable();
          this.forma.controls['Nombre'].disable();

        }
   }

  accion(): void {
    this.loading = true;
    if ( this.nuevo ) {
      this.productoNuevo();
    } else {
      this.actualizar();
    }
    
  }

  actualizar(): void {
  let producto = {
    nombre: this.forma.getRawValue()['Nombre'],
    tipo: this.forma.getRawValue()['Tipo'],
    peso: this.forma.value['Peso'],
    precio: {
      distribuidor_ocasional: this.forma.value['PrecioDistribuidor'] ,
      distribuidor_preferencial: this.forma.value['PrecioPreferencial'],
      publico: this.forma.value['Precio']
    },
    descripcion: this.forma.value['Descripcion'],
    tag: this.forma.value['Tags']
  };
  this._productosService.updateProducto(producto)
    .subscribe(
        (response) => this.loading = false
    );
  } 

  productoNuevo(): void {
    this.loading = true;
    let producto = {
    name: this.forma.value['Nombre'],
    tipo: this.forma.value['Tipo'],
    peso: this.forma.value['Peso'],
    precio: {
      distribuidor_ocasional: this.forma.value['PrecioDistribuidor'] ,
      distribuidor_preferencial: this.forma.value['PrecioPreferencial'],
      publico: this.forma.value['Precio']
    },
    descripcion: this.forma.value['Descripcion'],
    tag: this.forma.value['Tags'],
    unidad_peso: 'g',
    vendor: 'Jabones La Istmeña Brava'
  };

  this._productosService.postProducto(producto).subscribe(
    (ok) => {
      this.loading = false;
    }
  );
  }

  borrar(): void {
    const name = this.forma.value['Nombre'];
    const tipo = this.forma.value['Tipo'];
    swal({
      title: 'Desea borrar?',
      text: 'Esta a punto de borrar ' + name,
      showCancelButton: true
    }).then(
      (borrado) => {
        this._productosService.deleteProducto(name,  tipo)
        .subscribe();
      }
    );
    
  }

  public volver () {
    this._location.back();
  }

  ngOnInit() {
  }

}
