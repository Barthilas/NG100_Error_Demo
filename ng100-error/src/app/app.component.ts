import { ChangeDetectorRef, Component, Input } from '@angular/core';
/*  Change detection Order
1. update bound properties for all child components/directives
2. call ngOnInit, OnChanges and ngDoCheck lifecycle hooks on all child components/directives
    update DOM for the current component
3. run change detection for a child component
4. call ngAfterViewInit lifecycle hook for all child components/directives
/*

/*
What happens when Angular runs change detection? Concrete example.
1. Check A component -> update bindings = evaluate 'A message placeholder for the child component' for child-comp and pass it down to B.
Also store on view view.oldValues[0] = 'A message placeholder for the child component';

2. Call lifecycle hooks

3. Evaluate {{name}} to text 'I am A component' -> update DOM with this value -> put evaluated value to oldValues view.oldValues[1] = 'I am A component';

4. Run same checks for Child component, once the component is checked the current digest loop is finished.

5. (DEV MODE) Run second digest loop, with the operations above. Now imagine that somehow the property text was updated on the A component
 to the $'updated text from child component' after Angular passed the value $'A message placeholder for the child component' to the B component
  and stored it. So it now runs the verification digest and the first operation is to check that the property name is not changed:

  AComponentView.instance.text === view.oldValues[0]; // false
'A message placeholder for the child component' === 'updated text from child component, "you\'re toast!"'; // false

And thus Angular throws the error ExpressionChangedAfterItHasBeenCheckedError.

The same would happen if 3rd operation "name" would be updated after it was rendered in DOM and stored.

AComponentView.instance.name === view.oldValues[1]; // false
'I am A component' === 'updated name'; // false
*/

/*WHY IT EXISTS?
Angular enforces so-called unidirectional data flow from top to bottom.
No component lower in hierarchy is allowed to update properties of a parent component after parent changes have been processed.
*/
@Component({
  selector: 'parent-comp',
  template: `
    <span>{{ name }}</span>
    <child-comp [text]="text"></child-comp>
  `,
})
export class AComponent {
  name = 'I am A component';
  text = 'A message placeholder for the child component';

  constructor(private cd: ChangeDetectorRef){}

  /*This eliminates all the errors, forces new change detection cycle for parent A
  between first one and the verification phase.
  Triggered: when change detection for all child components have been performed, they all had possibility to update parent components property
  Issue: we trigger change detection for the parent A component, Angular will run change detection for all child components as well.
         So there’s a possibility of parent property update anew. This ensures that after the first digest loop the entire tree of components is stable
  */
  ngAfterViewInit() {
    this.cd.detectChanges();
}
}

@Component({
  selector: 'child-comp',
  template: `<p>{{ text }}</p>`,
})
export class BComponent {
  @Input() text: any;

  constructor(private parent: AComponent) {
    //Uncomment: ok
    // this.parent.text = 'updated text from child component, "you\'re toast!"';
  }

  ngOnInit() {
    //Uncomment: error
    this.parent.text = 'updated text from child component, "you\'re toast!"';
    //Uncomment: error
    // this.parent.name = "I am a B component"; same error.
  }

  //Hook that is called after DOM update.
  ngAfterViewInit() {
    //Uncomment: error
    // this.parent.text = 'updated text from child component, "you\'re toast!"';

    /* Asynchronous update - not recommended, works
      One thing to notice here is that both change detection and verification digests are performed synchronously.
      It means that if we update properties asynchronously the values will not be updated
      when the verification loop is running and we should get no error
    */
   //Macrotask
    // setTimeout(() => {
    //   this.parent.text = 'updated text from child component, "you\'re toast!"';
    // });
    //Microtask - fugly
    // Promise.resolve(null).then(() => this.parent.name = 'updated name');
  }
}
