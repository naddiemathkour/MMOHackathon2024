import { Component } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';
import { SupabaseService } from '../../services/supabase.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ISprintTestPlan } from '../../interfaces/sprinttestplan.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CdkAccordionModule, MatTableModule, MatIconModule, CommonModule],
  providers: [OpenaiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
  text:   string = '';
  items: ISprintTestPlan[] = [];
  displayedColumns: string[] = ['sprinttestplan_id', 'sprint_title', 'start_date', 'end_date', 'completed_date'];
  testPlanDisplayColumn: string[] = ['storytestplan_id', 'jira_id', 'story_summary', 'execution_count', 'test_count', 'passed_test_count', 'testing_status', 'completed_date'];

  constructor(private _supabase: SupabaseService) { }

  async ngOnInit(): Promise<void> {
    const data = await this._supabase.getSprintStoryData();
    this.mapDataForUser(data);

  }

  mapDataForUser(data: any){
    if(data !== null){
      const UPDATED_DATA: ISprintTestPlan[] = []; 
      data.forEach((item: any) => { 
        UPDATED_DATA.push({ 
          sprinttestplan_id: item.sprinttestplan_id, 
          sprint_title: item.sprint_title, 
          start_date: item.start_date, 
          end_date: item.end_date, 
          completed_date: item.completed_date,
          total_story_count: item.total_story_count,
          passed_story_count: item.passed_story_count,
          storytestplans: item.storytestplans
        }); 
      });
      this.items = UPDATED_DATA;
      console.log('updated_data is: ', UPDATED_DATA);
    }
  }
}
