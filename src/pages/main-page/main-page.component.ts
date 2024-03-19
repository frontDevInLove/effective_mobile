import { Component } from '@angular/core';
import { ColumnManagerComponent } from '../../widgets/column-manager/column-manager.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ColumnManagerComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}
