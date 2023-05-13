import { Route } from '@angular/router';

export const surveyRoutes: Route[] = [
  {
      path: '',
      loadComponent: () => import('./list/list.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./edit/edit.component'),
  },
  {
    path: 'preview/:id',
    loadComponent: () => import('./preview/preview.component'),
  },
  {
    path: 'add',
    loadComponent: () => import('./add/add.component'),
  }
];
