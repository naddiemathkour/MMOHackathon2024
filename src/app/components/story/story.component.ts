import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { OpenaiService } from '../../services/openai.service';
import { SupabaseService } from '../../services/supabase.service';
import { IStoryTestPlan } from '../../interfaces/storytestplan.interface';
import { ITest } from '../../interfaces/test.interface';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CdkAccordionModule, MatTableModule, MatIconModule, CommonModule, MatSlideToggleModule],
  providers: [OpenaiService],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent {
  isToggled = false;
  text:  string = '';
  storyplan!: IStoryTestPlan;
  tests: ITest[] = [];
  storytestplan_id!: string | null;
  displayedColumns: string[] = ['storytestplan_id', 'jira_id', 'story_summary', 'execution_count', 'test_count', 'passed_test_count', 'test_status', 'completed_date'];
  testPlanDisplayColumn: string[] = ['test_id', 'scenario', 'test_status', 'expected_result', 'created_at', 'updated_at'];

  constructor(private _ai: OpenaiService, private _supabase: SupabaseService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
        this.storytestplan_id = params.get('storytestplan_id');
        
        if (this.storytestplan_id) { // Check if the ID is valid
            const data = await this._supabase.getStoryTestPlanById(Number(this.storytestplan_id));
            this.mapDataForUser(data);
        } else {
            console.error('No storytestplan_id found in the route');
        }
    });

    await this.getStoryTests();
    console.log("Tests: ", this.tests)
  }

  async getStoryTests(): Promise<void> {
    await this._supabase.getStoryTestData(Number(this.storytestplan_id)).then((data) => {
      if (data) {
        this.tests = data;
      }
    });
  }

  mapDataForUser(data: any){
    if(data !== null){
      const item = data[0];
      let UPDATED_DATA: IStoryTestPlan = {} as IStoryTestPlan; 
        UPDATED_DATA = { 
          storytestplan_id: item.storytestplan_id,
          jira_id: item.jira_id,
          story_summary: item.story_summary,
          execution_count: item.execution_count,
          test_count: item.test_count,
          passed_test_count: item.passed_test_count,
          test_status: item.test_status,
          completed_at: item.completed_at,
          created_at: item.created_at,
        } as IStoryTestPlan; 
        this.storyplan = UPDATED_DATA as IStoryTestPlan;
      console.log('Story plan is: ', this.storyplan);
    }
  }

  onToggle(event: any, test_id: number): void { 
    this.isToggled = event.checked; 
    const status = this.isToggled == true ? 'Passed' : 'Failed';
    this._supabase.saveTestStatus(status, test_id);
    console.log('here', event);
    console.log('here2', test_id);
  }
}
