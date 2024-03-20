import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-ellipsis-menu',
  standalone: true,
  imports: [MatIcon, MatMenu, MatMenuTrigger, MatMenuItem, MatIconButton],
  templateUrl: './ellipsis-menu.component.html',
  styleUrl: './ellipsis-menu.component.scss',
})
export class EllipsisMenuComponent {
  @Output() onDelete = new EventEmitter<void>();
  delete() {
    this.onDelete.emit();
  }
}
