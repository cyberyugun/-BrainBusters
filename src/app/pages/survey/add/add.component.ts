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
    public surveyService: SurveyService,
    private surveyAddUsecase: SurveyAddUsecase) {

  }
  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    introduction: new FormControl('', [Validators.required]),
    type: new FormControl(1, [Validators.required]),
    questions: new FormArray([
      this.surveyService.AddQuestion('', '', '', '', '')
    ])
  })

  get questionsForm() {
    return this.addForm.get('questions') as FormArray;
  }

  onSubmit(form: FormGroup) {
    const params: SurveyData = {
      id: uuidv4(),
      title: form.value.title,
      questions: form.value.questions,
      introduction: form.value.introduction,
      type: form.value.type
    }
    if (form.valid) {
      this.surveyAddUsecase.execute(params).subscribe((res) => {
        this.router.navigateByUrl('/survey')
      })
    }
  }
}
