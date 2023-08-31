import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  selectedItem: any;

  constructor(private activatedRoute: ActivatedRoute) {}

   /**
   * @description fetching passed data while routing
   * @memberof ItemDetailsComponent
   */
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param: Params) => {
      const paramData = param['item'];
      this.selectedItem = JSON.parse(paramData);
    });
  }
}
