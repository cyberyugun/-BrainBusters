import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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

  AddQuestionForm(title: string, valOption: string, idOps: string, answer: string, idQuestion: string, form: FormGroup) {
    const questionsForm = form.get('questions') as FormArray;
    questionsForm.push(this.AddQuestion(title, valOption, idOps, answer, idQuestion));
  }

  optionsForm(idx: number, form: FormGroup) {
    const question = form.get(`questions.${idx}`);
    return question?.get('options') as FormArray;
  }

  addOption(val: string, idx: number, id: string, form: FormGroup) {
    const question = form.get(`questions.${idx}`);
    const optionForm = this.AddOption(val, id);
    const optionsForm = question?.get('options') as FormArray;
    optionsForm.push(optionForm);
  }

  optionList(idx: number, form: FormGroup) {
    const question = form.get(`questions.${idx}`);
    const optionsForm = question?.get('options') as FormArray;
    const filter = optionsForm.value.filter((option: any) => option.value !== '')
    return filter;
  }

  errorValidator(err: ValidationErrors | null, params: string) {
    if (err) {
      return err[params];
    }
    return false;
  }
}
