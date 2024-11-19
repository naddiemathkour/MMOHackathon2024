import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then((c) => c.HomeComponent)
  },

  {
    path: 'create/stories',
    loadComponent: () => import('./components/createstory/createstory.component').then((c) => c.CreatestoryComponent)
  },

  {
    path: 'stories/list/:storytestplan_id',
    loadComponent: () => import('./components/story/story.component').then((c) => c.StoryComponent)
  },

  {
    path: 'sprint/plan/create',
    loadComponent: () => import('./components/sprinttestplan/sprinttestplan.component').then((c) => c.SprinttestplanComponent)
  }
];
