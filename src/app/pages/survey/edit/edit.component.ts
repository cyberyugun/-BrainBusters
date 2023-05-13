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
    private surveyService: SurveyService,
    private surveyEditUsecase: SurveyEditUsecase,
    private storeService: StoreService,
    private route: ActivatedRoute) {

  }
  addForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
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
      this.addForm.controls.id.setValue(survey.id);
      survey.questions.forEach((question, idx) => {
        if (idx > 0) {
          this.AddQuestionForm('', '', '', '', '');
        }
        const questions = this.addForm.controls.questions.controls[idx].controls;
        questions.title.setValue(question.title);
        questions.answer.setValue(question.answer);
        questions.id.setValue(question.id);
        question.options.forEach((option, idOpt) => {
          if (idOpt > 0) {
            this.addOption(option.value, idx, option.id);
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
    if (form.valid) {
      this.surveyEditUsecase.execute(form.value).subscribe((res) => {
        this.router.navigateByUrl('/survey')
      })
    }
  }
}
