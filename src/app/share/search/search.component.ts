import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {
  
  @Output() changeSearch: EventEmitter<string> = new EventEmitter();

  @Input() type: string;
  
  busqueda: string;

  constructor() { }

  ngOnInit() {

  }

  changeValue() {
    this.changeSearch.emit(this.busqueda);
  }

}
