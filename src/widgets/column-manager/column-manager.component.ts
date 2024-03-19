import { Component } from '@angular/core';
import { ColumnAddFormComponent } from '@components/column-add-form/column-add-form.component';

@Component({
  selector: 'app-column-manager',
  standalone: true,
  imports: [ColumnAddFormComponent],
  templateUrl: './column-manager.component.html',
  styleUrl: './column-manager.component.scss',
})
export class ColumnManagerComponent {
  addColumn($event: string) {}
}
