import { Component, Output, OnInit, EventEmitter} from '@angular/core';
import { ITest } from '../../interfaces/test.interface';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GenTestCardComponent } from '../cardcomponents/gen-test-card/gen-test-card.component';

@Component({
  selector: 'app-createstory',
  standalone: true,
  imports: [ReactiveFormsModule, GenTestCardComponent],
  templateUrl: './createstory.component.html',
  styleUrl: './createstory.component.scss'
})
export class CreatestoryComponent implements OnInit {
  @Output() tests: EventEmitter<ITest[]> = new EventEmitter<ITest[]>();
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();
  
  generatedTests: ITest[] = [{} as ITest, {} as ITest];
  omittedTests: number[] = []

  storyForm!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.storyForm = this._fb.group({
      jira_id: "",
      jira_ac: "",
      additional_instructions: "",
    })
  }

  addTest(event: boolean, index: number) {
    console.log(event, index);
    if (event === false) {
      this.omittedTests.push(index);
    }
    else {
      this.omittedTests.splice(this.omittedTests.indexOf(index), 1);
    }
    console.log('Omitted: ', this.omittedTests)
  }
}
