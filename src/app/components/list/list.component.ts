import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatListModule,
  MatListOptionCheckboxPosition,
} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ThemePalette } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { listItems } from 'src/app/models/listItems.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [Router],
})
export class ListComponent implements OnInit, OnChanges {
  @Input() listTitle: string = '';
  @Input() listItems: any[] = [];
  @Input() isLoading: boolean = true;

  @Input() color: ThemePalette | undefined;
  @Input() checkboxPosition: MatListOptionCheckboxPosition = 'before';

  searchText: string = '';
  selectedItem: any;
  filteredItems: listItems[] = [];
  displayItems: any[] = [];
  searchFields = ['status', 'name', 'firstName'];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.displayItems = this.listItems;
  }

  filterItems() {
    if (this.searchText) {
      this.filteredItems = this.listItems.filter((item) => {
        return this.searchFields.some((field) => {
          if (item[field]) {
            return item[field]
              .toString()
              .toLowerCase()
              .includes(this.searchText.toLowerCase());
          }
          return false;
        });
      });
    } else {
      this.filteredItems = this.listItems;
    }
    this.displayItems = this.filteredItems;
  }

  getSelectedValue(selectionList: any) {
    this.selectedItem = selectionList.selectedOptions.selected[0]?.value;
    this.routeToItemDetails();
  }

  routeToItemDetails() {
    const selectedItemId: number = this.selectedItem
      ? this.selectedItem?.id
      : null;
    const wholeSelectedItem = encodeURIComponent(
      JSON.stringify(this.selectedItem)
    );
    window.location.href = `/item-detail?id=${selectedItemId}&item=${wholeSelectedItem}`;
  }

  // routeToItemDetails() { // router.navigate not working with standalone components
  //   const selectedItemId = this.selectedItem ? { id: this.selectedItem?.id } : null;
  //   this.router.navigate(['/item-detail', selectedItemId]);
  // }

  trackByFn(item: any): number {
    return item.id;
  }
}
