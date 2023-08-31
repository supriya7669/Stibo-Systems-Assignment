import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ListComponent } from '../list/list.component';
import { Subscription } from 'rxjs';
import { ICountry } from 'src/app/models/country.model';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnDestroy {
  countries: ICountry[] = [];
  isLoading: boolean = false;
  subscription: Subscription | null = null;

  constructor(private dataService: DataService) {}

  /**
   * @description fetching country list
   * @memberof CountryComponent
   */
  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.dataService
      .fetchData<ICountry>('countries')
      .subscribe({
        next: (response: ICountry[]) => {
          if (response) {
            this.countries = response;
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          this.isLoading = false;
        },
      });
  }

  /**
   * @description unsubscribe the subscribptions
   * @memberof CountryComponent
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
