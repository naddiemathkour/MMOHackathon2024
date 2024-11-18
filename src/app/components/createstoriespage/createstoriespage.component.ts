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
  storyTestPlans: IStoryTestPlan[] = [];
  createStory: boolean = false;

  addStory(): void {
    this.createStory = true;
  }

  submit(event: any): void {
    if (this.createStory === true) {
      console.log('posting stories');
      console.log(event);
      this.createStory = false;
    }
  }
}
