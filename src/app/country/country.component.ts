import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { ListComponent } from '../list/list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnDestroy {
  countries = [];
  isLoading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.isLoading= true;
    this.dataService.fetchData('countries').subscribe((response: any) => {
      this.countries = response;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
