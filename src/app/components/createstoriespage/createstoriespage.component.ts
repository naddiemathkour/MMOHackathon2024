import { Component } from '@angular/core';
import { IStoryTestPlan } from '../../interfaces/storytestplan.interface'
import { CreatestoryComponent } from '../createstory/createstory.component';

@Component({
  selector: 'app-createstoriespage',
  standalone: true,
  imports: [CreatestoryComponent],
  templateUrl: './createstoriespage.component.html',
  styleUrl: './createstoriespage.component.scss'
})
export class CreatestoriespageComponent {
  storyTestPlans: IStoryTestPlan[] = [{} as IStoryTestPlan, {} as IStoryTestPlan];
  createStory: boolean = false;

  create(): void {
    this.createStory = true;
  }
}
