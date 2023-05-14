import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-normal-page',
  templateUrl: './normal-page.component.html',
  styleUrls: ['./normal-page.component.scss']
})
export class NormalPageComponent {
  @Input() dynamicForm!: FormGroup;
  @Output() nextAction: EventEmitter<void> = new EventEmitter<void>();
  favoriteSeason = new FormControl('');

  next() {
    this.nextAction.emit();
  }

  onRadioButtonChange(event: MatRadioChange, id: number) {
    const questions = this.dynamicForm.controls[`questions`] as FormArray;
    const question = questions.controls[id] as FormGroup;
    question.controls['answer'].setValue(event.value);
    question.controls['answer'].updateValueAndValidity();
  }
}
