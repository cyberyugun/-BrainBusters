import { Observable } from "rxjs";
import { HttpSurveyAddCollectionResponse, HttpSurveyCollectionResponse, HttpSurveySubmitCollectionResponse } from "../repository/survey/survey-collection.response";
import { SurveyData, filterSurvey } from "../domain/survey.model";

export abstract class SurveyAbstract {
  abstract List(params: filterSurvey): Observable<HttpSurveyCollectionResponse>;
  abstract Add(params: SurveyData): Observable<HttpSurveyAddCollectionResponse>;
  abstract Edit(params: SurveyData): Observable<HttpSurveyAddCollectionResponse>;
  abstract Submit(params: SurveyData): Observable<HttpSurveySubmitCollectionResponse>;
}
