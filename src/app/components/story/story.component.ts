import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { OpenaiService } from '../../services/openai.service';
import { SupabaseService } from '../../services/supabase.service';
import { IStoryTestPlan } from '../../interfaces/storytestplan.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CdkAccordionModule, MatTableModule, MatIconModule, CommonModule],
  providers: [OpenaiService],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent {
  text:  string = '';
  storyplans: IStoryTestPlan[] = [];
  displayedColumns: string[] = ['storytestplan_id', 'jira_id', 'story_summary', 'execution_count', 'test_count', 'passed_test_count', 'test_status', 'completed_date'];
  testPlanDisplayColumn: string[] = ['test_id', 'scenario', 'test_status', 'expected_result', 'created_at', 'updated_at'];

  constructor(private _ai: OpenaiService, private _supabase: SupabaseService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
        const storytestplan_id = params.get('storytestplan_id');
        
        if (storytestplan_id) { // Check if the ID is valid
            const data = await this._supabase.getStoryTestData(storytestplan_id);
            this.mapDataForUser(data);
        } else {
            console.error('No storytestplan_id found in the route');
        }
    });
}


  mapDataForUser(data: any){
    if(data !== null){
      const UPDATED_DATA: IStoryTestPlan[] = []; 
      data.forEach((item: any) => { 
        UPDATED_DATA.push({ 
          storytestplan_id: item.storytestplan_id,
          jira_id: item.jira_id,
          story_summary: item.story_summary,
          execution_count: item.execution_count,
          test_count: item.test_count,
          passed_test_count: item.passed_test_count,
          test_status: item.test_status,
          completed_at: item.completed_at,
          created_at: item.created_at,
          tests: item.tests,
        } as IStoryTestPlan); 
      });
      this.storyplans = UPDATED_DATA;
      console.log('updated_data is: ', UPDATED_DATA);
    }
  }
}
