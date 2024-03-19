import { Component, EventEmitter, Output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-column-add-form',
  standalone: true,
  imports: [MatButton, MatIcon, MatIconButton, ReactiveFormsModule],
  templateUrl: './column-add-form.component.html',
  styleUrl: './column-add-form.component.scss',
})
export class ColumnAddFormComponent {
  public showForm = false;

  @Output() private onSave = new EventEmitter<string>();

  public columnForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  openForm(willOpen: boolean) {
    this.showForm = willOpen;

    if (willOpen) {
      this.columnForm.reset();
    }
  }

  save() {
    if (this.columnForm.invalid) return;
    if (!this.columnForm.value.name) return;

    this.onSave.emit(this.columnForm.value.name);
    this.openForm(false);
  }
}
