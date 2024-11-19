import { Component, Output, OnInit, EventEmitter} from '@angular/core';
import { ITest } from '../../interfaces/test.interface';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenTestCardComponent } from '../cardcomponents/gen-test-card/gen-test-card.component';
import { OpenaiService } from '../../services/openai.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { IStoryTestPlan } from '../../interfaces/storytestplan.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createstory',
  standalone: true,
  imports: [ReactiveFormsModule, GenTestCardComponent, MatFormFieldModule, ReactiveFormsModule, CommonModule],
  templateUrl: './createstory.component.html',
  styleUrl: './createstory.component.scss'
})
export class CreatestoryComponent implements OnInit {
  acceptedTests: ITest[] = [];
  generatedTests: ITest[] = [];
  omittedTestIndicies: number[] = []

  loading: boolean = false;

  storyForm!: FormGroup;
  storyTestPlans: IStoryTestPlan[] = [];

  constructor(private _fb: FormBuilder, private _ai: OpenaiService, private location: Location, private _supabase: SupabaseService, private router: Router) {}

  ngOnInit(): void {
    this.storyForm = this._fb.group({
      jira_id: ["", Validators.required],
      jira_ac: ["", Validators.required],
      additional_instructions: [""],
    })
  }

  toggleTest(event: boolean, index: number) {
    // Removing
    if (event === false) {
      this.omittedTestIndicies.push(index);
    }
    // Re-Adding
    else {
      this.omittedTestIndicies.splice(this.omittedTestIndicies.indexOf(index), 1);
    }
  }

  generate() {
    if (this.storyForm.valid === true) {
      this.loading = true;
      const fields = this.storyForm.value;
      this._ai.generateTestsFromAC(fields.jira_ac).then((data) => {
        if (data) {
          for (const test of data) {
            this.generatedTests.push({expected_result: test.expected_result, scenario: test?.scenario} as ITest)
          }

          this.loading = false;
        }
      });
    }
    else {
      alert("Please fill out all required fields");
    }
  }

  async createStoryTestPlan(data: any): Promise<void> {
    let sprintId;
    await this._supabase.getSprintTestPlanId().then((data) => {
      sprintId = data?.pop()?.sprinttestplan_id;
    });
    if (!sprintId) {
      return;
    }
    const payload: IStoryTestPlan = {
      sprinttestplan_id: sprintId,
      jira_id: 'test',
      test_count: data.length,
    } as IStoryTestPlan
    await this._supabase.postStoryTestData(payload);
  }

  async createTests(data: any) {
      let storyTestPlanId;
      await this._supabase.getStoryTestPlanId().then((data) => storyTestPlanId = data?.pop()?.storytestplan_id);
      if (!storyTestPlanId) {
        return;
      }
      for (const t of data) {
        this._supabase.postTestData(
        {
          expected_result: t.expected_result,
          scenario: t.scenario,
          storytestplan_id: storyTestPlanId
        } as ITest)
      }
  }

  async updateStoryTestPlans(id: number) {
    await this._supabase.getStoryTestPlansBySprintTestPlanId(id).then((data) => {
      if (!data) return;
      this.storyTestPlans = [...data];
    });
  }

  async submit(event: any): Promise<void> {
    await this.createStoryTestPlan(event); 
    await this.createTests(event);

    let id;
    await this._supabase.getSprintTestPlanId().then((data) => id = data?.pop()?.sprinttestplan_id)

    if (id) {
      await this.updateStoryTestPlans(id);
    }
  }

  submitStory() {
    if (this.storyForm.valid === true) {
      for (let i = 0; i < this.generatedTests.length; i++) {
        if (this.omittedTestIndicies.includes(i)) continue;
        this.acceptedTests.push(this.generatedTests[i]);
      }
      this.submit(this.acceptedTests);
    }
    this.router.navigate(['']);
  }

  goBack(): void { this.location.back(); }
}
