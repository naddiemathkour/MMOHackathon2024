import { Component, Output, OnInit} from '@angular/core';
import { ITest } from '../../interfaces/test.interface';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-createstory',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './createstory.component.html',
  styleUrl: './createstory.component.scss'
})
export class CreatestoryComponent implements OnInit {
  @Output() tests!: ITest[];

  storyForm!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.storyForm = this._fb.group({
      jira_id: "",
      jira_ac: "",
      additional_instructions: "",
    })
  }
}
