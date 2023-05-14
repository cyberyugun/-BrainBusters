import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SurveyAbstract } from "src/app/helper/abstract/survey.abstract";
import { HttpSurveyAddCollectionResponse, HttpSurveyCollectionResponse, HttpSurveySubmitCollectionResponse } from "../survey-collection.response";
import { Observable, of } from "rxjs";
import { SurveyData, filterSurvey } from "src/app/helper/domain/survey.model";
import { StoreService } from "src/app/helper/service/store.service";

@Injectable({
  providedIn: 'root'
})
export class MockSurveyRepository implements SurveyAbstract {
  constructor(private http: HttpClient,
    private storeService: StoreService) {}

  responseSuccess: HttpSurveyAddCollectionResponse = {
    code: 200,
    message: "success",
    meta: undefined,
    data: ""
  }
  dataSuccess: Observable<HttpSurveyAddCollectionResponse> = of(this.responseSuccess);

  responseSubmitSuccess: HttpSurveySubmitCollectionResponse = {
    code: 200,
    message: "success",
    meta: undefined,
    data: {
      score: 0
    }
  }
  dataSubmitSuccess: Observable<HttpSurveySubmitCollectionResponse> = of(this.responseSubmitSuccess);
  List(params: filterSurvey): Observable<HttpSurveyCollectionResponse> {
    const listSurvey = JSON.parse(localStorage.getItem('survey') as string) as SurveyData[];
    let filter = listSurvey;
    if (params.title) {
      filter = filter.filter((e: filterSurvey) => (e.title.toLowerCase()).includes(params.title.toLowerCase()));
    }
    return of(filter ? filter : []);
  }
  Add(params: SurveyData): Observable<HttpSurveyAddCollectionResponse> {
    this.storeService.addSurvey([params]);
    const data = this.storeService.survey.getValue();
    localStorage.setItem('survey', JSON.stringify(data));
    return of(this.responseSuccess);
  }
  Edit(params: SurveyData): Observable<HttpSurveyAddCollectionResponse> {
    this.storeService.editSurvey(params);
    return of(this.responseSuccess);
  }
  Submit(params: SurveyData): Observable<HttpSurveySubmitCollectionResponse> {
    const score = this.storeService.getSurveyScore(params);
    this.responseSubmitSuccess.data.score = score;
    return this.dataSubmitSuccess;
  }
}

