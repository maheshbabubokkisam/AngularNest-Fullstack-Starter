import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { CounterState } from './counter.state';
import { CounterModel } from './counter.model';
import { Increment } from './counter.action';

@Component({
  selector: 'counter',
  template: `
    <div>
      <div>Clicked: <strong>{{ c$.value }}</strong> times, value is <strong>{{ evenOrOdd | async }}</strong>.</div>
      <button mat-raised-button color="primary" (click)="onIncrement()">Increment</button>
    </div>
  `,
})
export class CounterComponent {
  public c$: CounterModel;

  @Select(CounterState) public counter$: Observable<CounterModel>;
  @Select(CounterState.evenOrOdd) public evenOrOdd: Observable<CounterModel>;

  constructor(private store: Store) {
    this.counter$.subscribe((state: CounterModel): void => {
      this.c$ = { ...state };
    });
  }

  public onIncrement(): void {
    this.store.dispatch(new Increment());
  }
}
