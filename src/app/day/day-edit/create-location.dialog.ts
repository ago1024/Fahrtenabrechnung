import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Location } from '@app/services/location.service';

export type CreateLocationDialogData = never;
export type CreateLocationDialogResult = Omit<Location, 'id'>;

@Component({
  templateUrl: 'create-location.dialog.html',
  styleUrls: ['create-location.dialog.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class CreateLocationDialogComponent {

  public readonly dialogRef = inject(MatDialogRef<CreateLocationDialogComponent>);

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]]
  });

}
