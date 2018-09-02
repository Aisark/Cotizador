import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalSearchService {

  private classShow = 'hide';

  constructor() { }


  public hideModal () {
    this.classShow = 'hide';
  }


  public showModal () {
    this.classShow = '';
  }
}
