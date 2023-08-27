import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'payments',
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./payment/payment.component').then((c) => c.PaymentComponent),
  },
  {
    path: 'countries',
    loadComponent: () =>
      import('./country/country.component').then((c) => c.CountryComponent),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('./team/team.component').then((c) => c.TeamComponent),
  }
];
