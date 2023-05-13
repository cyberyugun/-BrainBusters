import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SurveyAbstract } from "src/app/helper/abstract/survey.abstract";
import { environment } from "src/environments/environment";
import { HttpSurveyAddCollectionResponse, HttpSurveyCollectionResponse } from "../survey-collection.response";
import { Observable, map, of } from "rxjs";
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
  List(params: filterSurvey): Observable<HttpSurveyCollectionResponse> {
    const listSurvey = JSON.parse(localStorage.getItem('survey') as string) as SurveyData[];
    let filter = listSurvey;
    if (params.title) {
      filter = filter.filter((e: filterSurvey) => (e.title.toLowerCase()).includes(params.title.toLowerCase()));
    }
    return of(filter);
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
}

