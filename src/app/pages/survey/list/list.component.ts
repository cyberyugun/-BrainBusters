import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'src/app/theme/table/table.module';
import { DisplayedColumns, HeaderTitle, HeaderType, Width } from './mock';
import { SurveyData, filterSurvey } from 'src/app/helper/domain/survey.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreService } from 'src/app/helper/service/store.service';
import { SurveyListUsecase } from 'src/app/helper/usecase/survey/list.usecase';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export default class ListComponent implements OnInit {
  width = Width;
  displayedColumns = DisplayedColumns;
  headerType = HeaderType;
  headerTitle = HeaderTitle;
  idTable = 'submission_id';
  list: SurveyData[] = [];
  count: number = 0;
  pagenum: number = 1;
  filterForm = new FormGroup({
    title: new FormControl('')
  })
  constructor(private router: Router,
    private surveyListUsecase: SurveyListUsecase,
    private storeService: StoreService,
    private store: Store<{survey: filterSurvey}>) {}
  ngOnInit(): void {
    this.setFormSearch();
    this.getData();
  }

  setFormSearch() {
    const data = this.store.select((store) => store);
    data.subscribe((data) => {
      this.filterForm.controls.title.setValue(data.survey.title);
    });
  }

  LinkAction(event: SurveyData) {
    this.router.navigateByUrl(`/survey/edit/${event.id}`);
  }

  DeleteAction(event: SurveyData) {
    this.storeService.deleteSurvey(event);
    this.getData();
  }

  EditAction(event: SurveyData) {
    this.router.navigateByUrl(`/survey/edit/${event.id}`);
  }

  previewAction(event: SurveyData) {
    this.router.navigateByUrl(`/survey/preview/${event.id}`);
  }

  getData() {
    const params: filterSurvey = {
      title: (this.filterForm.controls.title.value) ?? ''
    }
    this.storeService.setSearch(params);
    this.surveyListUsecase.execute(params).subscribe(
      (response) => {
        this.list = response;
        this.count = this.list.length;
      }
    )
  }
}
