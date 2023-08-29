import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  MatListModule,
  MatListOptionCheckboxPosition,
  MatSelectionListChange,
} from '@angular/material/list';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ThemePalette } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    NgFor,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule,
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
  @Input() listData: any[] = [];
  @Input() isLoading: boolean = true;

  @Input() color: ThemePalette;
  @Input() checkboxPosition: MatListOptionCheckboxPosition = 'before';

  searchText = '';
  selectedItems: string[] = [];
  selectedItem: any;
  filteredItems: any[] = [];
  displayData: any[] = [];
  searchField = ['status', 'name', 'firstName'];

  listForm = this.fb.group({
    selectedListItem: '',
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayData = this.listData;
  }

  filterItems() {
    if (this.searchText) {
      this.filteredItems = this.listData.filter((item) => {
        return this.searchField.some((field) => {
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
      this.filteredItems = this.listData;
    }
    // console.log('filteredItems', this.filteredItems);
    this.displayData = this.filteredItems;
  }

  getSelectedValue(selectionList: any) {
    this.selectedItem = selectionList.selectedOptions.selected[0]?.value;
    // console.log('Selected Item value: ', this.selectedItem);
    this.routeToItemDetails();
  }

  routeToItemDetails() {
    const selectedItemId: any = this.selectedItem
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

  onFormSubmit() {
    console.log(this.listForm.get('selectedListItem')?.value);
  }
}
