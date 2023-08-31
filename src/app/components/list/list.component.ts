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
import { IListItems } from 'src/app/models/listItems.model';

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
  filteredItems: IListItems[] = [];
  displayItems: any[] = [];
  searchFields = ['status', 'name', 'firstName'];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * @description passing listItems of payment/country/users to displayItems
   * @memberof ListComponent
   */
  ngOnChanges(): void {
    this.displayItems = this.listItems;
  }

  /**
   * @description filtering list items based on search text
   * @memberof ListComponent
   */
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

  /**
   * @description selecting items of list by clicking on checkbox
   * @memberof ListComponent
   */
  getSelectedValue(selectionList: any) {
    this.selectedItem = selectionList.selectedOptions.selected[0]?.value;
    this.routeToItemDetails();
  }

  /**
   * @description routing to user-detail component with the selected item
   * @memberof ListComponent
   */
  routeToItemDetails() {
    const selectedItemId: number = this.selectedItem
      ? this.selectedItem?.id
      : null;
    const wholeSelectedItem = encodeURIComponent(
      JSON.stringify(this.selectedItem)
    );
    window.location.href = `/item-detail?id=${selectedItemId}&item=${wholeSelectedItem}`;
  }

  /**
   * @description router.navigate() not working with standalone components hence used window location
   * to route to other component (routeToItemDetails function)
   * more R&D required to use Router with standalone components
   * @memberof ListComponent
   */
  // routeToItemDetails() {
  //   const selectedItemId = this.selectedItem ? { id: this.selectedItem?.id } : null;
  // this.router.navigate(['/item-detail', this.selectedItem.id], { state: { selectedItem: this.selectedItem } });
  // }

  /**
   * @description improve the performance and efficiency of rendering lists using *ngFor
   * @memberof ListComponent
   */
  trackByFn(item: any): number {
    return item.id;
  }
}
