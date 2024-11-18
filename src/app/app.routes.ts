import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then((c) => c.HomeComponent)
  },

  {
    path: 'create/stories',
    loadComponent: () => import('./components/createstoriespage/createstoriespage.component').then((c) => c.CreatestoriespageComponent)
  }
];
