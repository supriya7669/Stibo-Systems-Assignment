import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent {
  constructor() {}
}
