//our root app component
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

// ------------------------- B COMPONENT -------------------

@Component({
  selector: 'b-comp',
  template: ` <span>{{ name }}</span> `,
})
export class BComponent {
  name = 'I am B component';
  @Input() text: string;
  @Output() change = new EventEmitter();

  constructor() {
    this.text = '';
    //ok
    // this.change.emit('updated text');
  }

  ngOnInit() {
    //throws error
    this.change.emit('updated text');

    //ok
    // setTimeout(() => {
    //   this.change.emit('updated text');
    // }, 0)
  }
}

// ------------------------- APP COMPONENT -------------------

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{ name }}</h1>
    <b-comp [text]="text" (change)="update($event)"></b-comp>
  `,
})
export class App {
  name = 'I am A component';
  text = 'A message for the child component';

  constructor(private cd: ChangeDetectorRef) {}

  update(value: string) {
    this.text = value;
  }

  //Error fix.
  ngAfterContentChecked()
  {
    this.cd.detectChanges();
  }
}
