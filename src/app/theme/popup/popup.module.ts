import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from "./popup.component";

@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    PopupComponent
  ]
})
export class PopUpModule {}
