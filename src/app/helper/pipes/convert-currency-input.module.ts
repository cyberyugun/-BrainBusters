import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertCurrencyInputPipe } from './convert-currency-input.pipe';

const component = [
  ConvertCurrencyInputPipe
];

@NgModule({
  declarations: component,
  exports: component,
  providers: component,
  imports: [
    CommonModule
  ],
})
export class ConvertCurrencyInputPipesModule { }
