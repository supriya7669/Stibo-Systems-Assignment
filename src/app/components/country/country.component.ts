import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ListComponent } from '../list/list.component';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/country.model';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnDestroy {
  countries: Country[] = [];
  isLoading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.dataService
      .fetchData<Country>('countries')
      .subscribe((response: Country[]) => {
        this.countries = response;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
