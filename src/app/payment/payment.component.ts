import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { ListComponent } from '../list/list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  payments: any = [];
  countFilteredPayments: any = [];
  isLoading: boolean = false;

  subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.dataService
      .fetchData('payments')
      .subscribe((response: any) => {
        this.payments = response;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  countPayments() {
    const count: any = {};
    this.payments.forEach((payment: any) => {
      const status = payment.status;

      if (count[status]) {
        count[status]++;
      } else {
        count[status] = 1;
      }
    });

    console.log('count', count);
    this.countFilteredPayments = count;
  }
}
