import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITest } from '../../../interfaces/test.interface';

@Component({
  selector: 'app-gen-test-card',
  standalone: true,
  imports: [],
  templateUrl: './gen-test-card.component.html',
  styleUrl: './gen-test-card.component.scss'
})
export class GenTestCardComponent {
  @Output() included: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() test!: ITest;

  isIncluded: boolean = true;

  include(state: boolean): void {
    this.isIncluded = !this.isIncluded;
    this.included.emit(state);
  }
}  
