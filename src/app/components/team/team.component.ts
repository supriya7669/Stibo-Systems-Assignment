import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ListComponent } from '../list/list.component';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  isLoading: boolean = false;
  subscription: Subscription | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.dataService
      .fetchData<IUser>('users')
      .subscribe({
        next: (response: IUser[]) => {
          if (response) {
            this.users = response;
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
