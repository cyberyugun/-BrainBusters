import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SurveyService } from '../survey.service';
import { SurveyData } from 'src/app/helper/domain/survey.model';
import { StoreService } from 'src/app/helper/service/store.service';
import { SurveySubmitUsecase } from 'src/app/helper/usecase/survey/submit.usecase';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PagesModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export default class PreviewComponent implements OnInit {
  introduction: boolean = false;
  normal: boolean = true;
  end: boolean = false;
  score = 0;

  constructor(private surveyService: SurveyService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    private surveySubmitUsecase: SurveySubmitUsecase) {}

  dynamicForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    introduction: new FormControl('', [Validators.required]),
    type: new FormControl(1, [Validators.required]),
    questions: new FormArray([
      this.surveyService.AddQuestion('', '', '', '', '')
    ])
  })

  ngOnInit() {
    this.getData();
  }

  getData() {
    const id = this.route.snapshot.paramMap.get("id") as string;
    const data = this.storeService.getDetailSurvey(id) as SurveyData[];
    if (data.length > 0) {
      const survey = data[0];
      this.dynamicForm.controls.title.setValue(survey.title);
      this.dynamicForm.controls.introduction.setValue(survey.introduction);
      this.dynamicForm.controls.type.setValue(survey.type);
      this.dynamicForm.controls.id.setValue(survey.id);
      survey.questions.forEach((question, idx) => {
        if (idx > 0) {
          this.surveyService.AddQuestionForm('', '', '', '', '', this.dynamicForm);
        }
        const questions = this.dynamicForm.controls.questions.controls[idx].controls;
        questions.title.setValue(question.title);
        questions.answer.setValue('');
        questions.id.setValue(question.id);
        question.options.forEach((option, idOpt) => {
          if (idOpt > 0) {
            this.surveyService.addOption(option.value, idx, option.id, this.dynamicForm);
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

  toQuestionPage() {
    this.introduction = false;
    this.normal = true;
  }

  toEndPage() {
    const params = this.dynamicForm.value as SurveyData;
    this.surveySubmitUsecase.execute(params).subscribe((res) => {
      this.score = res.data.score;
      this.normal = false;
      this.end = true;
    });
  }
}
