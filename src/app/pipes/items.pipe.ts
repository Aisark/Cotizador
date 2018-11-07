import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'items'
})
export class ItemsPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let tipos = [];
    for (let key in value) {
      if (value[key].length > 0) {
        tipos.push(value[key]);
      }
     
    }

    return tipos;
  }

}
