import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { SurveyService } from '../survey.service';
import { SurveyAddUsecase } from 'src/app/helper/usecase/survey/add.usecase';
import { SurveyData } from 'src/app/helper/domain/survey.model';
import { v4 as uuidv4 } from 'uuid';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export default class AddComponent {
  constructor(
    private router: Router,
    private surveyService: SurveyService,
    private surveyAddUsecase: SurveyAddUsecase) {

  }
  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    questions: new FormArray([
      this.surveyService.AddQuestion('', '', '', '', '')
    ])
  })

  AddQuestionForm(title: string, valOption: string, idOps: string, answer: string, idQuestion: string) {
    const questionsForm = this.addForm.get('questions') as FormArray;
    questionsForm.push(this.surveyService.AddQuestion(title, valOption, idOps, answer, idQuestion));
  }

  get questionsForm() {
    return this.addForm.get('questions') as FormArray;
  }

  optionsForm(idx: number) {
    const question = this.addForm.get(`questions.${idx}`);
    return question?.get('options') as FormArray;
  }

  addOption(val: string, idx: number, id: string) {
    const question = this.addForm.get(`questions.${idx}`);
    const optionForm = this.surveyService.AddOption(val, id);
    const optionsForm = question?.get('options') as FormArray;
    optionsForm.push(optionForm);
  }

  optionList(idx: number) {
    const question = this.addForm.get(`questions.${idx}`);
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

  onSubmit(form: FormGroup) {
    const params: SurveyData = {
      id: uuidv4(),
      title: form.value.title,
      questions: form.value.questions
    }
    if (form.valid) {
      this.surveyAddUsecase.execute(params).subscribe((res) => {
        this.router.navigateByUrl('/survey')
      })
    }
  }
}
