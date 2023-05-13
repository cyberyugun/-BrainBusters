import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor() {}
  AddQuestion(title: string, valOption: string, idOps: string, answer: string, idQuestion: string) {
    const questionsForm = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'options': new FormArray([
        this.AddOption(valOption, idOps)
      ]),
      'answer': new FormControl(answer, [Validators.required]),
      'id': new FormControl(idQuestion ? idQuestion : uuidv4(), [Validators.required])
    })

    const optionsForm = questionsForm.controls.options as FormArray;
    optionsForm.controls.forEach(opt => {
      opt.updateValueAndValidity();
    });

    return questionsForm;
  }

  AddOption(val: string, id: string) {
    return new FormGroup({
      'id': new FormControl(id ?  id : uuidv4()),
      'value': new FormControl(val, [Validators.required])
    })
  }
}
