import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ListComponent } from '../list/list.component';
import { Subscription } from 'rxjs';
import { ModifiedPayment, Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  payments: Payment[] = [];
  modifiedPayments: ModifiedPayment[] = [];
  isLoading: boolean = false;

  subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.dataService
      .fetchData<Payment>('payments')
      .subscribe((response: Payment[]) => {
        this.payments = response;
        this.isLoading = false;
        this.addPaymentsCount();
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addPaymentsCount() {
    const countPayments: { [status: string]: number } = {};
    this.payments.forEach((payment: Payment) => {
      const status = payment.status;

      countPayments[status]
        ? countPayments[status]++
        : (countPayments[status] = 1);
    });

    this.modifiedPayments = Object.keys(countPayments).map(
      (status: string) => ({
        status,
        count: countPayments[status],
      })
    );
  }
}
