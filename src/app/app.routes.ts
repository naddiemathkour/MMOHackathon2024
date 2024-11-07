import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/test/test.component').then((c) => c.TestComponent)
  }
];
