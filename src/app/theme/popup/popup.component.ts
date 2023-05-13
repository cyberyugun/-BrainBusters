import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: ''
  },
  private dialogRef: MatDialogRef<PopupComponent>) {
  }

  close(val: string) {
    this.dialogRef.close(val);
  }
}
