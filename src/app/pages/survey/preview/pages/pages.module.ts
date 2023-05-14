import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ZeroPageComponent } from "./zero-page/zero-page.component";
import { NormalPageComponent } from "./normal-page/normal-page.component";
import { EndPageComponent } from "./end-page/end-page.component";
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {MatStepperModule} from '@angular/material/stepper';

const component = [
  ZeroPageComponent,
  NormalPageComponent,
  EndPageComponent
]
@NgModule({
  declarations: component,
  imports: [
    HttpClientModule,
    RouterModule,
    MatRadioModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatStepperModule
  ],
  exports: component
})
export class PagesModule {}
