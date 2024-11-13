import { Component, inject } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Location } from '../../services/location.service';

export type EditLocationDialogData = Omit<Location, 'id'>;
export type EditLocationDialogResult = Omit<Location, 'id'> & { resetDistances: boolean };

@Component({
  templateUrl: 'edit-location.dialog.html',
  styleUrls: ['edit-location.dialog.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
})
export class EditLocationDialogComponent {

  public readonly dialogRef = inject(MatDialogRef<EditLocationDialogComponent>);

  private readonly fb = inject(FormBuilder);

  private data = inject<EditLocationDialogData>(MAT_DIALOG_DATA);

  protected readonly form = this.fb.group({
    name: [this.data.name, [Validators.required]],
    address: [this.data.address, [Validators.required]],
    resetDistances: [false],
  });

}
