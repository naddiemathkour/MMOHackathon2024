import { Component } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  providers: [OpenaiService],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  text: string = '';

  constructor(private _ai: OpenaiService) { }

  click() {
    console.log(this._ai.tempConnTest().subscribe((data) => {
      this.text = data.choices[0]?.message.content || '';
    }));
  }
}
