import { OnInit, Component } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';
import { SupabaseService } from '../../services/supabase.service';
import {CdkAccordionModule} from '@angular/cdk/accordion';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CdkAccordionModule],
  providers: [OpenaiService],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  text:   string = '';
  items:  string[] = ['1', '2', '3'];

  constructor(private _ai: OpenaiService, private _supabase: SupabaseService) { }

  async ngOnInit(): Promise<void> {
    //console.log(await this._supabase.testDbConn())
  }

  async click(): Promise<void> {
    /*this._ai.tempConnTest().subscribe((data) => {
      this.text = data.choices[0]?.message.content || '';
    });*/
  }
}
