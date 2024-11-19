import { Component, EventEmitter, Output } from '@angular/core';
import { IStoryTestPlan } from '../../interfaces/storytestplan.interface'
import { CreatestoryComponent } from '../createstory/createstory.component';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ITest } from '../../interfaces/test.interface';
import { OpenaiService } from '../../services/openai.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-createstoriespage',
  standalone: true,
  imports: [CreatestoryComponent, MatInputModule, MatButtonModule, MatCardModule, MatDividerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './createstoriespage.component.html',
  styleUrl: './createstoriespage.component.scss'
})
export class CreatestoriespageComponent {
  @Output() submit: EventEmitter<ITest[]> = new EventEmitter<ITest[]>();
  
  generatedTests: ITest[] = [];
  omittedTests: number[] = []

  storyForm!: FormGroup;

  constructor(private _fb: FormBuilder, private _ai: OpenaiService, private location: Location) {}

  ngOnInit(): void {
    this.storyForm = this._fb.group({
      jira_id: ["", Validators.required],
      jira_ac: ["", Validators.required],
      additional_instructions: [""],
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

  goBack(): void { this.location.back(); }
}
