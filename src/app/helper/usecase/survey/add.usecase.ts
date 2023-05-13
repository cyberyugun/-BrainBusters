import { Observable } from "rxjs";
import { Usecase } from "../../base/usecase";
import { Injectable } from "@angular/core";
import { SurveyData } from "../../domain/survey.model";
import { HttpSurveyAddCollectionResponse } from "../../repository/survey/survey-collection.response";
import { SurveyAbstract } from "../../abstract/survey.abstract";


@Injectable({
  providedIn: "root"
})
export class SurveyAddUsecase implements Usecase<SurveyData, HttpSurveyAddCollectionResponse> {
  constructor(private repository: SurveyAbstract) {}
  execute(params: SurveyData): Observable<HttpSurveyAddCollectionResponse> {
    return this.repository.Add(params);
  }
}
