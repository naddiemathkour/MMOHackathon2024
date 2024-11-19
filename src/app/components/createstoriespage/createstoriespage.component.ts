import { Component } from '@angular/core';
import { IStoryTestPlan } from '../../interfaces/storytestplan.interface';
import { ITest } from '../../interfaces/test.interface';
import { CreatestoryComponent } from '../createstory/createstory.component';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-createstoriespage',
  standalone: true,
  imports: [CreatestoryComponent],
  templateUrl: './createstoriespage.component.html',
  styleUrl: './createstoriespage.component.scss'
})
export class CreatestoriespageComponent {
  storyTestPlans: IStoryTestPlan[] = [];
  createStory: boolean = false;

  constructor(private _supabase: SupabaseService) { }

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
      test_count: data.length
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

  async submit(event: any): Promise<void> {
    if (this.createStory === true) {
      await this.createStoryTestPlan(event); 
      await this.createTests(event);
      this.createStory = false;
    }
  }
}
