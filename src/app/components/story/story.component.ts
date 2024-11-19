import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { OpenaiService } from '../../services/openai.service';
import { SupabaseService } from '../../services/supabase.service';


export interface StoryTestPlan {
  storytestplan_id: number;
  jira_id: string;
  story_summary: string;
  execution_count: number;
  test_count: number;
  passed_test_count: number;
  test_status: string;
  completed_date: string;
  tests: StoryTest[];
}

export interface StoryTest {
  storytestplan_id: number;
  jira_id: string;
  story_summary: string;
  execution_count: number;
  test_count: number;
  passed_test_count: number;
  test_status: string;
  completed_date: string;
}

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
  items: StoryTestPlan[] = [];
  displayedColumns: string[] = ['storytestplan_id', 'jira_id', 'story_summary', 'execution_count', 'test_count', 'passed_test_count', 'test_status', 'completed_date'];
  testPlanDisplayColumn: string[] = ['storytestplan_id', 'jira_id', 'story_summary', 'execution_count', 'test_count', 'passed_test_count', 'testing_status', 'completed_date'];

  constructor(private _ai: OpenaiService, private _supabase: SupabaseService) { }

  async ngOnInit(): Promise<void> {
    const data = await this._supabase.getStoryTestData();
    this.mapDataForUser(data);

  }

  mapDataForUser(data: any){
    if(data !== null){
      const UPDATED_DATA: StoryTestPlan[] = []; 
      data.forEach((item: any) => { 
        UPDATED_DATA.push({ 
          storytestplan_id: item.storytestplan_id,
          jira_id: item.jira_id,
          story_summary: item.story_summary,
          execution_count: item.execution_count,
          test_count: item.test_count,
          passed_test_count: item.passed_test_count,
          test_status: item.test_status,
          completed_date: item.completed_date,
          tests: item.tests,
        }); 
      });
      this.items = UPDATED_DATA;
      console.log('updated_data is: ', UPDATED_DATA);
    }
  }
}
