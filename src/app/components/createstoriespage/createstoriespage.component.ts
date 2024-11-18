import { Component } from '@angular/core';

@Component({
  selector: 'app-createstoriespage',
  standalone: true,
  imports: [],
  templateUrl: './createstoriespage.component.html',
  styleUrl: './createstoriespage.component.scss'
})
export class CreatestoriespageComponent {
  storyTestPlans: IStoryTestPlan[] = [];

}
