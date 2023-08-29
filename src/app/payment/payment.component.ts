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
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  payments: any = [];
  modifiedPayments: any = [];
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
        this.addPaymentsCount();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addPaymentsCount() {
    const countPayments: any = {};
    this.payments.forEach((payment: any) => {
      const status = payment.status;

      if (countPayments[status]) {
        countPayments[status]++;
      } else {
        countPayments[status] = 1;
      }
    });

    // console.log('countPayments', countPayments);

    this.modifiedPayments = Object.keys(countPayments).map((status) => ({
      status,
      count: countPayments[status],
    }));

    // console.log('modifiedPayments', this.modifiedPayments);
  }
}
