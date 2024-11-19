import { Component, Output, OnInit, EventEmitter} from '@angular/core';
import { ITest } from '../../interfaces/test.interface';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenTestCardComponent } from '../cardcomponents/gen-test-card/gen-test-card.component';
import { OpenaiService } from '../../services/openai.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-createstory',
  standalone: true,
  imports: [ReactiveFormsModule, GenTestCardComponent, MatFormFieldModule, ReactiveFormsModule, CommonModule],
  templateUrl: './createstory.component.html',
  styleUrl: './createstory.component.scss'
})
export class CreatestoryComponent implements OnInit {
  @Output() submit: EventEmitter<ITest[]> = new EventEmitter<ITest[]>();
  
  acceptedTests: ITest[] = [];
  generatedTests: ITest[] = [];
  omittedTestIndicies: number[] = []

  storyForm!: FormGroup;

  constructor(private _fb: FormBuilder, private _ai: OpenaiService, private location: Location) {}

  ngOnInit(): void {
    this.storyForm = this._fb.group({
      jira_id: ["", Validators.required],
      jira_ac: ["", Validators.required],
      additional_instructions: [""],
    })
  }

  toggleTest(event: boolean, index: number) {
    console.log(event, index);
    // Removing
    if (event === false) {
      this.omittedTestIndicies.push(index);
    }
    // Re-Adding
    else {
      this.omittedTestIndicies.splice(this.omittedTestIndicies.indexOf(index), 1);
    }
    console.log('Omitted: ', this.omittedTestIndicies)
  }

  generate() {
    if (this.storyForm.valid === true) {
      const fields = this.storyForm.value;
      this._ai.generateTestsFromAC(fields.jira_ac).then((data) => {
        for (const test of data) {
          this.generatedTests.push({expected_result: test.expected_result, scenario: test?.scenario} as ITest)
        }
      });
    }
    else {
      alert("Please fill out all required fields");
    }
  }

  submitStory() {
    console.log(this.storyForm.valid)
    if (this.storyForm.valid === true) {
      for (let i = 0; i < this.generatedTests.length; i++) {
        if (this.omittedTestIndicies.includes(i)) continue;
        this.acceptedTests.push(this.generatedTests[i]);
      }
      this.submit.emit(this.acceptedTests);
    }
  }

  goBack(): void { this.location.back(); }
}
