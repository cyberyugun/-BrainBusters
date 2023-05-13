import { Route } from '@angular/router';
import { AuthGuard } from './helper/service/auth.guard';

export const appRoutes: Route[] = [
  {
      path: '',
      loadChildren: () => import('./pages/login/login.route').then(x => x.loginRoutes)
  },
  {
    path: 'survey',
    loadChildren: () => import('./pages/survey/survey.route').then(x => x.surveyRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component')
  }
];
