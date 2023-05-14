import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatStepper } from '@angular/material/stepper';
import { Survey } from 'src/app/helper/domain/survey.model';

@Component({
  selector: 'app-normal-page',
  templateUrl: './normal-page.component.html',
  styleUrls: ['./normal-page.component.scss']
})
export class NormalPageComponent implements OnInit {
  @Input() dynamicForm!: FormGroup;
  @Output() nextAction: EventEmitter<void> = new EventEmitter<void>();
  favoriteSeason = new FormControl('');
  isLinear = false;
  selectedIndex = 0;
  questions: Survey[] = [];
  @ViewChild("stepper") public stepper!: MatStepper;

  ngOnInit(): void {
    this.questions = this.dynamicForm.value.questions;
  }

  next() {
    this.nextAction.emit();
  }

  onRadioButtonChange(event: MatRadioChange, id: number) {
    const questions = this.dynamicForm.controls[`questions`] as FormArray;
    const question = questions.controls[id] as FormGroup;
    question.controls['answer'].setValue(event.value);
    question.controls['answer'].updateValueAndValidity();
  }

  selectionChange(event: StepperSelectionEvent) {
    this.selectedIndex = event.selectedIndex;
  }

  validNext(id: number) {
    const questions = this.dynamicForm.controls[`questions`] as FormArray;
    const question = questions.controls[id] as FormGroup;
    return question.valid;
  }

  nextStep() {
    this.stepper.next();
  }

  backStep() {
    this.stepper.previous();
  }
}
