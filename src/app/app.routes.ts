import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/test/test.component').then((c) => c.TestComponent)
  },
  {
    path: 'create/stories',
    loadComponent: () => import('./components/createstoriespage/createstoriespage.component').then((c) => c.CreatestoriespageComponent)
  }
];
