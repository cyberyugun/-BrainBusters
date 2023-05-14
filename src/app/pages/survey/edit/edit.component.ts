import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SurveyService } from '../survey.service';
import { SurveyData } from 'src/app/helper/domain/survey.model';
import { v4 as uuidv4 } from 'uuid';
import { SurveyEditUsecase } from 'src/app/helper/usecase/survey/edit.usecase';
import { StoreService } from 'src/app/helper/service/store.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
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
export default class EditComponent implements OnInit {
  constructor(
    private router: Router,
    public surveyService: SurveyService,
    private surveyEditUsecase: SurveyEditUsecase,
    private storeService: StoreService,
    private route: ActivatedRoute) {

  }
  addForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    introduction: new FormControl('', [Validators.required]),
    type: new FormControl(1, [Validators.required]),
    questions: new FormArray([
      this.surveyService.AddQuestion('', '', '', '', '')
    ])
  })

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const id = this.route.snapshot.paramMap.get("id") as string;
    const data = this.storeService.getDetailSurvey(id) as SurveyData[];
    if (data.length > 0) {
      const survey = data[0];
      this.addForm.controls.title.setValue(survey.title);
      this.addForm.controls.introduction.setValue(survey.introduction);
      this.addForm.controls.type.setValue(survey.type);
      this.addForm.controls.id.setValue(survey.id);
      survey.questions.forEach((question, idx) => {
        if (idx > 0) {
          this.surveyService.AddQuestionForm('', '', '', '', '', this.addForm);
        }
        const questions = this.addForm.controls.questions.controls[idx].controls;
        questions.title.setValue(question.title);
        questions.answer.setValue(question.answer);
        questions.id.setValue(question.id);
        question.options.forEach((option, idOpt) => {
          if (idOpt > 0) {
            this.surveyService.addOption(option.value, idx, option.id, this.addForm);
          }
          const options = questions.options.controls[idOpt]['controls'];
          options.id.setValue(option.id);
          options.value.setValue(option.value);
        })
      });
    } else {
      this.router.navigateByUrl('/survey')
    }
  }

  get questionsForm() {
    return this.addForm.get('questions') as FormArray;
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.surveyEditUsecase.execute(form.value).subscribe((res) => {
        this.router.navigateByUrl('/survey')
      })
    }
  }
}
