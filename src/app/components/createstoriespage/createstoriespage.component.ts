import { Component, EventEmitter, Output, OnInit } from '@angular/core';
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
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-createstoriespage',
  standalone: true,
  imports: [CreatestoryComponent, MatInputModule, MatButtonModule, MatCardModule, MatDividerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './createstoriespage.component.html',
  styleUrl: './createstoriespage.component.scss',
})

export class CreatestoriespageComponent implements OnInit {
  generatedTests: ITest[] = [];
  omittedTests: number[] = []
  storyForm!: FormGroup;
  storyTestPlans: IStoryTestPlan[] = [];
  createStory: boolean = false;

  constructor(private _supabase: SupabaseService, private _fb: FormBuilder, private _ai: OpenaiService, private location: Location) { }

  async ngOnInit(): Promise<void> {
      let id;
      await this._supabase.getSprintTestPlanId().then((data) => id = data?.pop()?.sprinttestplan_id)

      if (id) {
        await this.updateStoryTestPlans(id);
      }
    
    this.storyForm = this._fb.group({
      jira_id: ["", Validators.required],
      jira_ac: ["", Validators.required],
      additional_instructions: [""],
    })
  }

  addStory(): void {
    this.createStory = true;
  }

  async createStoryTestPlan(data: any): Promise<void> {
    let sprintId;
    await this._supabase.getSprintTestPlanId().then((data) => {
      sprintId = data?.pop()?.sprinttestplan_id;
    });
    if (!sprintId) {
      console.error(
        "Server error: Failed to validate sprinttestplan_id"
      );
      return;
    }
    const payload: IStoryTestPlan = {
      sprinttestplan_id: sprintId,
      jira_id: 'test',
      test_count: data.length,
      tests: []
    } as IStoryTestPlan
    await this._supabase.postStoryTestData(payload);
  }

  async createTests(data: any) {
      let storyTestPlanId;
      await this._supabase.getStoryTestPlanId().then((data) => storyTestPlanId = data?.pop()?.storytestplan_id);
      if (!storyTestPlanId) {
        console.error("Server error: Failed to validate storytestplan_id")
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
    if (this.createStory === true) {
      await this.createStoryTestPlan(event); 
      await this.createTests(event);

      let id;
      await this._supabase.getSprintTestPlanId().then((data) => id = data?.pop()?.sprinttestplan_id)

      if (id) {
        await this.updateStoryTestPlans(id);
      }

      this.createStory = false;
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
      //this.submit.emit(this.generatedTests);
    }
  }

  goBack(): void { this.location.back(); }
}
