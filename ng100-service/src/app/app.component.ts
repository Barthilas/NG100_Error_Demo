import { Component, Injectable, Input } from '@angular/core';
type NameChangedFn = (value: string) => void;
@Injectable({
  providedIn: 'root',
})
class SharedService {
  listeners: any = [];
  _text = '';

  onNameChange(fn: NameChangedFn) {
      this.listeners.push(fn);
  }

  set text(value: string) {
      this._text = value;
      this.listeners.forEach((fn: NameChangedFn) => {
          fn(value);
      })
  }
}
@Component({
  selector: 'my-app',
  template: `
      <h1>Hello {{name}}</h1>
      <b-comp [text]="text"></b-comp>
  `,
})
export class App {
    name = 'I am A component';
    text = 'A message for the child component';

    constructor(sharedService: SharedService) {
        sharedService.onNameChange((value: string) => {
            this.text = value;
        })
    }
}

@Component({
    selector: 'b-comp',
    template: `
        <span>{{name}}</span>
    `
})
export class BComponent {
    name = 'I am B component';
    @Input() text: string;

    constructor(private sharedService: SharedService) {
      this.text = "";
    }

    ngOnInit() {
        this.sharedService.text = 'updated name';
    }
}
