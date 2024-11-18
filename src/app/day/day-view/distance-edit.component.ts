import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@app/services/location.service';

export type DistanceEditData = {
  from: Location;
  to: Location;
  distance: number | undefined;
  url: string;
}
export type DistanceEditResult = number;

@Component({
  templateUrl: 'distance-edit.component.html',
  styleUrls: ['distance-edit.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatInput, MatSuffix, MatButton, MatDialogClose, MatDialogActions]
})
export class DistanceEditComponent {
  readonly dialogRef = inject<MatDialogRef<DistanceEditComponent, DistanceEditResult>>(MatDialogRef);
  readonly data = inject<DistanceEditData>(MAT_DIALOG_DATA);

  readonly url = inject(DomSanitizer).bypassSecurityTrustResourceUrl(this.data.url);

  readonly form = inject(FormBuilder).group({
    distance: [ this.data.distance ?? null, [Validators.required, Validators.min(0)]]
  });
}
