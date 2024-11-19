import { Component, Output, OnInit, EventEmitter} from '@angular/core';
import { ITest } from '../../interfaces/test.interface';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenTestCardComponent } from '../cardcomponents/gen-test-card/gen-test-card.component';
import { OpenaiService } from '../../services/openai.service';

@Component({
  selector: 'app-createstory',
  standalone: true,
  imports: [ReactiveFormsModule, GenTestCardComponent],
  templateUrl: './createstory.component.html',
  styleUrl: './createstory.component.scss'
})
export class CreatestoryComponent implements OnInit {
  @Output() submit: EventEmitter<ITest[]> = new EventEmitter<ITest[]>();
  
  generatedTests: ITest[] = [];
  omittedTests: number[] = []

  storyForm!: FormGroup;

  constructor(private _fb: FormBuilder, private _ai: OpenaiService) {}

  ngOnInit(): void {
    this.storyForm = this._fb.group({
      jira_id: ["", Validators.required],
      jira_ac: ["", Validators.required],
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

  generate() {
    if (this.storyForm.valid === true) {
      const fields = this.storyForm.value;
      this._ai.generateTestsFromAC(fields.jira_ac).then((data) => {
        for (const test of data) {
          this.generatedTests.push({expected_result: test.expected_result, scenario: test?.scenario} as ITest)
        }
        console.log('Gen Test: ', this.generatedTests);
      });
    }
    else {
      alert("Please fill out all required fields");
    }
  }

  submitStory() {
    console.log(this.storyForm.valid)
    if (this.storyForm.valid === true) {
      this.submit.emit(this.generatedTests);
    }
  }
}
