import { Component } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {

  message = '';


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

    // init_plugins();
  }
}
