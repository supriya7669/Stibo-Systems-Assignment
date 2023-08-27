import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { ListComponent } from '../list/list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass'],
})
export class TeamComponent implements OnInit, OnDestroy {
  users = [];
  isLoading: boolean = false;
  subscription: Subscription = new Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.isLoading= true;
    this.dataService.fetchData('users').subscribe((response: any) => {
      this.users = response;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
