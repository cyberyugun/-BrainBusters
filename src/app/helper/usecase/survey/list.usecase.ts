import { Observable } from "rxjs";
import { LoginAbstract } from "../../abstract/login.abstract";
import { Usecase } from "../../base/usecase";
import { Login } from "../../domain/login.model";
import { HttpLoginCollectionResponse } from "../../repository/login/login-collection.response";
import { Injectable } from "@angular/core";
import { filterSurvey } from "../../domain/survey.model";
import { HttpSurveyCollectionResponse } from "../../repository/survey/survey-collection.response";
import { SurveyAbstract } from "../../abstract/survey.abstract";


@Injectable({
  providedIn: "root"
})
export class SurveyListUsecase implements Usecase<filterSurvey, HttpSurveyCollectionResponse> {
  constructor(private repository: SurveyAbstract) {}
  execute(params: filterSurvey): Observable<HttpSurveyCollectionResponse> {
    return this.repository.List(params);
  }
}
