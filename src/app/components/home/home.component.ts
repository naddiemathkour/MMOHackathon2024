import { Component } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';
import { SupabaseService } from '../../services/supabase.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  sprintId: number;
  team: string;
  complete: number;
  status: string;
  startDate: string;
  endDate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sprintId: 1, team: 'Hydrogen', complete: 1.0079, status: 'H', startDate: '11/13/2024', endDate: '11/202/2024'},
  {sprintId: 2, team: 'Helium', complete: 4.0026, status: 'He', startDate: '11/13/2024', endDate: '11/202/2024'},
  {sprintId: 3, team: 'Lithium', complete: 6.941, status: 'Li', startDate: '11/13/2024', endDate: '11/202/2024'},
  {sprintId: 4, team: 'Beryllium', complete: 9.0122, status: 'Be', startDate: '11/13/2024', endDate: '11/202/2024'},
  {sprintId: 5, team: 'Boron', complete: 10.811, status: 'B', startDate: '11/13/2024', endDate: '11/202/2024'},
  {sprintId: 6, team: 'Carbon', complete: 12.0107, status: 'C', startDate: '11/13/2024', endDate: '11/202/2024'},
  {sprintId: 7, team: 'Nitrogen', complete: 14.0067, status: 'N', startDate: '11/13/2024', endDate: '11/202/2024'},
  {sprintId: 8, team: 'Oxygen', complete: 15.9994, status: 'O', startDate: '11/13/2024', endDate: '11/202/2024'},
  {sprintId: 9, team: 'Fluorine', complete: 18.9984, status: 'F', startDate: '11/13/2024', endDate: '11/202/2024'},
  {sprintId: 10, team: 'Neon', complete: 20.1797, status: 'Ne', startDate: '11/13/2024', endDate: '11/202/2024'},
];


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CdkAccordionModule, MatTableModule],
  providers: [OpenaiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  text:   string = '';
  items:  string[] = ['1', '2', '3'];
  displayedColumns: string[] = ['sprintId', 'team', 'complete', 'status', 'startDate', 'endDate'];
  dataSource = ELEMENT_DATA;

  constructor(private _ai: OpenaiService, private _supabase: SupabaseService) { }

  async ngOnInit(): Promise<void> {
    console.log(await this._supabase.testDbConn())
  }

  async click(): Promise<void> {
    this._ai.tempConnTest().subscribe((data) => {
      this.text = data.choices[0]?.message.content || '';
    });
  }
}
