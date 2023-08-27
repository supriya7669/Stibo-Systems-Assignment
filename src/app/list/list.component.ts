import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    NgFor,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent {
  @Input() listTitle: string = '';
  @Input() listData: any = [];
  @Input() isLoading: boolean = true;

  isSelected = true;

  techList = [
    { id: 101, lang: 'Java' },
    { id: 102, lang: 'Angular' },
    { id: 103, lang: 'Hibernate' },
  ];

  constructor(private fb: FormBuilder) {}

  listForm = this.fb.group({
    selectedListItem: '',
  });

  onListSelectionChange(ob: MatSelectionListChange) {
    console.log('Selected Item: ' + ob.source.selectedOptions.selected.length);
  }

  onFormSubmit() {
    console.log(this.listForm.get('selectedListItem')?.value);
  }
}
