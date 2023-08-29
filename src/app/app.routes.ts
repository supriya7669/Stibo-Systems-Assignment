import { Routes } from '@angular/router';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'payments',
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./components/payment/payment.component').then((c) => c.PaymentComponent),
  },
  {
    path: 'countries',
    loadComponent: () =>
      import('./components/country/country.component').then((c) => c.CountryComponent),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('./components/team/team.component').then((c) => c.TeamComponent),
  },
  {
    path: 'item-detail',
    loadComponent: () =>
      import('./components/item-details/item-details.component').then(
        (c) => c.ItemDetailsComponent
      ),
  },
];
