import { Routes } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component';

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
  },
  {
    path: 'item-detail',
    loadComponent: () =>
      import('./item-details/item-details.component').then(
        (c) => c.ItemDetailsComponent
      ),
  },
];
