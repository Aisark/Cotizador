import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string ): string {

    const url = 'assets/images/faces-clipart/pic-1.png';

    return url;
  }

}
