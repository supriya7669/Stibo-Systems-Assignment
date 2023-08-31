import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ListComponent } from '../list/list.component';
import { Subscription } from 'rxjs';
import { IModifiedPayment, IPayment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  payments: IPayment[] = [];
  modifiedPayments: IModifiedPayment[] = [];
  isLoading: boolean = false;
  subscription: Subscription | null = null;

  constructor(private dataService: DataService) {}

  /**
   * @description fetching payments list
   * @memberof PaymentComponent
   */
  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.dataService
      .fetchData<IPayment>('payments')
      .subscribe({
        next: (response: IPayment[]) => {
          if (response) {
            this.payments = response;
            this.isLoading = false;
            this.addPaymentsCount();
          }
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          this.isLoading = false;
        },
      });
  }

  /**
   * @description adding count based on status of payments and
   * creating modified payments list with status and count
   * @memberof PaymentComponent
   */
  addPaymentsCount() {
    const countPayments: { [status: string]: number } = {};
    this.payments.forEach((payment: IPayment) => {
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

  /**
   * @description unsubscribe the subscribptions
   * @memberof PaymentComponent
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
