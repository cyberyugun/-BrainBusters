import { Observable } from "rxjs";
import { Usecase } from "../../base/usecase";
import { Injectable } from "@angular/core";
import { SurveyData } from "../../domain/survey.model";
import { HttpSurveySubmitCollectionResponse } from "../../repository/survey/survey-collection.response";
import { SurveyAbstract } from "../../abstract/survey.abstract";


@Injectable({
  providedIn: "root"
})
export class SurveySubmitUsecase implements Usecase<SurveyData, HttpSurveySubmitCollectionResponse> {
  constructor(private repository: SurveyAbstract) {}
  execute(params: SurveyData): Observable<HttpSurveySubmitCollectionResponse> {
    return this.repository.Submit(params);
  }
}
