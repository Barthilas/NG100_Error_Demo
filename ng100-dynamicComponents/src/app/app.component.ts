//our root app component
import {
  Component,
  ViewContainerRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';

// -------------------------- B COMPONENT -------------------

@Component({
  selector: 'b-comp',
  template: ` <span>{{ name }}</span> `,
})
export class BComponent {
  name = 'I am B component';

  constructor() {}
}

// ------------------------- APP COMPONENT --------------------

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello {{ name }}</h1>
    <ng-container #vc></ng-container>
  `,
})
export class App {
  @ViewChild('vc', { read: ViewContainerRef }) vc: any;
  name = 'I am A component';

  constructor() {}
  ngAfterViewInit() {
    //error
    this.vc.createComponent(BComponent);

    //Ok
    // setTimeout(() => {
    //   this.vc.createComponent(BComponent);
    // }, 0)
  }
}
